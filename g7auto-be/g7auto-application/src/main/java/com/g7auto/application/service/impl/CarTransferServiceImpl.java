package com.g7auto.application.service.impl;

import com.g7auto.application.dto.request.CarTransferRequest;
import com.g7auto.application.dto.request.CarTransferSearchRequest;
import com.g7auto.application.dto.response.CarTransferResponse;
import com.g7auto.application.mapper.CarTransferMapper;
import com.g7auto.application.service.CarTransferService;
import com.g7auto.core.constant.codes.InventoryErrorCode;
import com.g7auto.core.entity.CarStatus;
import com.g7auto.core.entity.TransferStatus;
import com.g7auto.core.exception.BadRequestException;
import com.g7auto.core.exception.NotFoundUtils;
import com.g7auto.core.export.ExcelExportHelper;
import com.g7auto.core.response.PageResponse;
import com.g7auto.core.utils.PageableUtils;
import jakarta.servlet.http.HttpServletResponse;
import java.util.List;
import com.g7auto.domain.entity.Car;
import com.g7auto.domain.entity.CarTransfer;
import com.g7auto.domain.entity.Showroom;
import com.g7auto.infrastructure.persistence.CarRepository;
import com.g7auto.infrastructure.persistence.CarTransferRepository;
import com.g7auto.infrastructure.persistence.ShowroomRepository;
import com.g7auto.infrastructure.persistence.query.CarTransferQueryRepository;
import java.time.LocalDate;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@RequiredArgsConstructor
public class CarTransferServiceImpl implements CarTransferService {

  private final CarTransferRepository carTransferRepository;
  private final CarRepository carRepository;
  private final ShowroomRepository showroomRepository;
  private final CarTransferQueryRepository carTransferQueryRepository;
  private final CarTransferMapper carTransferMapper;

  @Override
  public PageResponse<CarTransferResponse> search(
      CarTransferSearchRequest request) {
    Pageable pageable = PageableUtils.from(request);
    return PageResponse.of(
        carTransferQueryRepository.search(request.getStatus(), request.getShowroomId(), request.getFromDate(), request.getToDate(), pageable),
        carTransferMapper::toResponse,
        request.getFromDate(), request.getToDate());
  }

  @Override
  public CarTransferResponse findById(Long id) {
    return carTransferMapper.toResponse(getTransfer(id));
  }

  @Override
  @Transactional
  public CarTransferResponse create(CarTransferRequest request) {
    Long fromShowroomId = request.getFromShowroomId();
    Long toShowroomId = request.getToShowroomId();
    if (fromShowroomId.equals(toShowroomId)) {
      log.error("Showroom xuất {} và nhập {} phải khác nhau", fromShowroomId, toShowroomId);
      throw new BadRequestException(InventoryErrorCode.G7_AUTO_00403);
    }

    Long carId = request.getCarId();
    Car car = carRepository.findById(carId).orElseThrow(() -> NotFoundUtils.carIdNotFound(carId));

    CarStatus carStatus = car.getStatus();
    if (carStatus != CarStatus.AVAILABLE && carStatus != CarStatus.NEW_ARRIVAL) {
      log.error("Xe không ở trạng thái sẵn sàng để điều chuyển: {}", carStatus);
      throw new BadRequestException(InventoryErrorCode.G7_AUTO_00404);
    }

    Showroom fromShowroom = showroomRepository.findById(fromShowroomId)
        .orElseThrow(() -> NotFoundUtils.showroomNotFound(fromShowroomId));

    Showroom toShowroom = showroomRepository.findById(toShowroomId)
        .orElseThrow(() -> NotFoundUtils.showroomNotFound(toShowroomId));

    CarTransfer transfer = carTransferMapper.toEntity(request);
    transfer.setCar(car);
    transfer.setFromShowroom(fromShowroom);
    transfer.setToShowroom(toShowroom);
    transfer.setTransferDate(LocalDate.now());
    transfer.setStatus(TransferStatus.PENDING);

    car.setStatus(CarStatus.IN_TRANSFER);
    carRepository.save(car);

    return carTransferMapper.toResponse(carTransferRepository.save(transfer));
  }


  @Override
  @Transactional
  public CarTransferResponse confirmExport(Long id) {
    CarTransfer transfer = getTransfer(id);

    TransferStatus status = transfer.getStatus();
    if (status != TransferStatus.PENDING) {
      log.error("Lệnh điều chuyển phải ở trạng thái CHỜ để xác nhận xuất kho: {}", status);
      throw new BadRequestException(InventoryErrorCode.G7_AUTO_00423);
    }
    transfer.setStatus(TransferStatus.EXPORTED);
    return carTransferMapper.toResponse(carTransferRepository.save(transfer));
  }

  @Override
  @Transactional
  public CarTransferResponse confirmReceive(Long id) {
    CarTransfer transfer = getTransfer(id);

    TransferStatus status = transfer.getStatus();
    if (!status.equals(TransferStatus.EXPORTED)) {
      log.error("Lệnh điều chuyển phải ở trạng thái ĐÃ XUẤT để xác nhận nhập kho: {}", status);
      throw new BadRequestException(InventoryErrorCode.G7_AUTO_00424);
    }
    Car car = transfer.getCar();
    car.setShowroom(transfer.getToShowroom());
    car.setStatus(CarStatus.AVAILABLE);
    carRepository.save(car);
    transfer.setStatus(TransferStatus.RECEIVED);
    transfer.setActualReceiveDate(LocalDate.now());
    return carTransferMapper.toResponse(carTransferRepository.save(transfer));
  }

  @Override
  @Transactional
  public CarTransferResponse cancel(Long id, String reason) {
    CarTransfer transfer = getTransfer(id);
    if (transfer.getStatus() == TransferStatus.RECEIVED) {
      log.error("Không thể hủy lệnh điều chuyển đã hoàn thành");
      throw new BadRequestException(InventoryErrorCode.G7_AUTO_00422);
    }
    Car car = transfer.getCar();
    car.setStatus(CarStatus.AVAILABLE);
    carRepository.save(car);
    transfer.setStatus(TransferStatus.CANCELLED);

    if (reason != null) {
      String notes = transfer.getNotes();
      transfer.setNotes((notes != null ? notes + " | " : "") + "Cancelled: " + reason);
    }
    return carTransferMapper.toResponse(carTransferRepository.save(transfer));
  }

  @Override
  public void exportCarTransfers(HttpServletResponse response) {
    List<CarTransferResponse> data = carTransferRepository.findAll().stream()
        .map(carTransferMapper::toResponse).toList();
    ExcelExportHelper.export(response, data, CarTransferResponse.class, "DANH SÁCH ĐIỀU CHUYỂN XE", "danh-sach-dieu-chuyen-xe");
  }

  private CarTransfer getTransfer(Long id) {
    return carTransferRepository.findById(id)
        .orElseThrow(() -> NotFoundUtils.carTransferIdNotFound(id));
  }
}
