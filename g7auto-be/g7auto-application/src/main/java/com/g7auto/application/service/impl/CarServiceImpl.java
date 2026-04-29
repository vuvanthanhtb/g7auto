package com.g7auto.application.service.impl;

import com.g7auto.application.dto.request.CarRequest;
import com.g7auto.application.dto.request.CarSearchRequest;
import com.g7auto.application.dto.request.CarUpdateRequest;
import com.g7auto.application.dto.response.CarResponse;
import com.g7auto.application.mapper.CarMapper;
import com.g7auto.application.service.CarService;
import com.g7auto.core.constant.codes.CarErrorCode;
import com.g7auto.core.entity.CarStatus;
import com.g7auto.core.exception.BadRequestException;
import com.g7auto.core.exception.ConflictException;
import com.g7auto.core.exception.NotFoundUtils;
import com.g7auto.core.export.ExcelExportHelper;
import com.g7auto.core.response.PageResponse;
import com.g7auto.core.utils.PageableUtils;
import jakarta.servlet.http.HttpServletResponse;
import java.util.List;
import com.g7auto.domain.entity.Car;
import com.g7auto.domain.entity.CarModel;
import com.g7auto.domain.entity.Showroom;
import com.g7auto.infrastructure.persistence.CarModelRepository;
import com.g7auto.infrastructure.persistence.CarRepository;
import com.g7auto.infrastructure.persistence.ShowroomRepository;
import com.g7auto.infrastructure.persistence.query.CarQueryRepository;
import java.time.LocalDate;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@RequiredArgsConstructor
public class CarServiceImpl implements CarService {

  private final CarRepository carRepository;
  private final CarModelRepository carModelRepository;
  private final ShowroomRepository showroomRepository;
  private final CarQueryRepository carQueryRepository;
  private final CarMapper carMapper;

  @Override
  public PageResponse<CarResponse> search(CarSearchRequest request) {
    Pageable pageable = PageableUtils.from(request);
    return PageResponse.of(
        carQueryRepository.search(request.getStatus(), request.getShowroomId(),
            request.getCarModelId(), request.getFromDate(), request.getToDate(), pageable),
        carMapper::toResponse,
        request.getFromDate(), request.getToDate());
  }

  @Override
  public CarResponse findById(Long id) {
    return carMapper.toResponse(getCar(id));
  }

  @Override
  @Transactional
  public CarResponse create(CarRequest request) {

    String chassisNumber = request.getChassisNumber();
    if (carRepository.existsByChassisNumber(chassisNumber)) {
      log.error("Số khung {} đã tồn tại trong hệ thống", chassisNumber);
      throw new ConflictException(CarErrorCode.G7_AUTO_00300);
    }

    String engineNumber = request.getEngineNumber();
    if (carRepository.existsByEngineNumber(engineNumber)) {
      log.error("Số máy {} đã tồn tại trong hệ thống", engineNumber);
      throw new ConflictException(CarErrorCode.G7_AUTO_00308);
    }

    Long carModelId = request.getCarModelId();
    CarModel carModel = carModelRepository.findById(carModelId)
        .orElseThrow(() -> NotFoundUtils.carModelIdNotFound(carModelId));

    Long showroomId = request.getShowroomId();
    Showroom showroom = showroomRepository.findById(showroomId)
        .orElseThrow(() -> NotFoundUtils.showroomNotFound(showroomId));

    Car car = carMapper.toEntity(request);
    car.setCarModel(carModel);
    car.setShowroom(showroom);
    car.setStatus(CarStatus.NEW_ARRIVAL);
    car.setArrivalDate(LocalDate.now());

    return carMapper.toResponse(carRepository.save(car));
  }

  @Override
  @Transactional
  public CarResponse update(Long id, CarUpdateRequest request) {
    Car car = getCar(id);
    if (car.getStatus() == CarStatus.SOLD) {
      log.error(
          "Xe đã hoàn tất thủ tục bán hàng không được phép chỉnh sửa thông tin kỹ thuật.");
      throw new BadRequestException(CarErrorCode.G7_AUTO_00306);
    }

    if (request.getShowroomId() != null) {
      Long showroomId = request.getShowroomId();
      Showroom showroom = showroomRepository.findById(showroomId)
          .orElseThrow(() -> NotFoundUtils.showroomNotFound(showroomId));
      car.setShowroom(showroom);
    }

    if (request.getStatus() != null) {
      CarStatus newStatus = CarStatus.valueOf(request.getStatus());
      validateStatusTransition(car.getStatus(), newStatus);
    }

    carMapper.updateEntity(request, car);
    return carMapper.toResponse(carRepository.save(car));
  }

  @Override
  @Transactional
  public void delete(Long id) {
    Car car = getCar(id);

    CarStatus carStatus = car.getStatus();
    if (carStatus == CarStatus.SOLD || carStatus == CarStatus.IN_TRANSFER) {
      log.error("Không thể xóa xe do trạng thái hiện tại là {}", carStatus);
      throw new BadRequestException(CarErrorCode.G7_AUTO_00310);
    }
    carRepository.delete(car);
  }

  private void validateStatusTransition(CarStatus current, CarStatus next) {
    if (current == CarStatus.SOLD && next != CarStatus.SOLD) {
      log.error(
          "Xe đã ở trạng thái 'Đã bán' là trạng thái cuối cùng, không được phép chuyển đổi sang các trạng thái khác.");
      throw new BadRequestException(CarErrorCode.G7_AUTO_00311);
    }
    if (current == CarStatus.DEPOSITED && next == CarStatus.AVAILABLE) {
      log.error(
          "Xe đang có phiếu đặt cọc hiệu lực không thể đổi trạng thái thủ công; cần thực hiện hủy phiếu đặt cọc trước.");
      throw new BadRequestException(CarErrorCode.G7_AUTO_00309);
    }
  }

  @Override
  public void exportCars(HttpServletResponse response) {
    List<CarResponse> data = carRepository.findAll().stream().map(carMapper::toResponse).toList();
    ExcelExportHelper.export(response, data, CarResponse.class, "DANH SÁCH KHO XE", "danh-sach-kho-xe");
  }

  private Car getCar(Long id) {
    return carRepository.findById(id).orElseThrow(() -> NotFoundUtils.carIdNotFound(id));
  }
}
