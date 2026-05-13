package com.g7auto.application.service.impl;

import com.g7auto.application.dto.request.CarRequest;
import com.g7auto.application.dto.request.CarSearchRequest;
import com.g7auto.application.dto.request.CarUpdateRequest;
import com.g7auto.application.dto.response.CarImportResultResponse;
import com.g7auto.application.dto.response.CarResponse;
import com.g7auto.application.mapper.CarMapper;
import com.g7auto.application.service.CarService;
import com.g7auto.core.constant.codes.CarErrorCode;
import com.g7auto.core.constant.codes.SystemErrorCode;
import com.g7auto.core.entity.CarStatus;
import com.g7auto.core.exception.BadRequestException;
import com.g7auto.core.exception.ConflictException;
import com.g7auto.core.exception.NotFoundUtils;
import com.g7auto.core.export.ExcelExportHelper;
import com.g7auto.core.export.ExcelSupport;
import com.g7auto.core.response.Page;
import com.g7auto.core.utils.ExportUtils;
import com.g7auto.core.utils.PageableUtils;
import com.g7auto.domain.entity.Car;
import com.g7auto.domain.entity.CarModel;
import com.g7auto.domain.entity.Showroom;
import com.g7auto.infrastructure.persistence.postgresql.CarModelRepository;
import com.g7auto.infrastructure.persistence.postgresql.CarRepository;
import com.g7auto.infrastructure.persistence.postgresql.ShowroomRepository;
import com.g7auto.infrastructure.persistence.postgresql.query.CarQueryRepository;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

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
  @Transactional(readOnly = true)
  public List<CarResponse> getAvailable() {
    return carRepository.findByStatus(CarStatus.AVAILABLE).stream()
        .map(carMapper::toResponse).toList();
  }

  @Override
  public Page<CarResponse> search(CarSearchRequest request) {
    Pageable pageable = PageableUtils.from(request);
    return Page.of(
        carQueryRepository.search(request.getStatus(), request.getShowroomId(),
            request.getCarModelId(), request.getLicensePlate(), request.getFromDate(),
            request.getToDate(), pageable),
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
    ExcelExportHelper.export(response, data, CarResponse.class, "DANH SÁCH KHO XE",
        "danh-sach-kho-xe");
  }

  @Override
  public CarImportResultResponse importCars(MultipartFile file) {
    int success = 0;
    List<String> errors = new ArrayList<>();

    try (Workbook workbook = WorkbookFactory.create(file.getInputStream())) {
      Sheet sheet = workbook.getSheetAt(0);

      for (int i = 1; i <= sheet.getLastRowNum(); i++) {
        Row row = sheet.getRow(i);
        if (row == null || isRowEmpty(row)) {
          break;
        }

        try {
          String chassisNumber = getCellString(row, 0);
          String engineNumber = getCellString(row, 1);
          String licensePlate = getCellString(row, 2);
          String carModelName = getCellString(row, 3);
          String showroomName = getCellString(row, 4);
          String salePriceStr = getCellString(row, 5);
          String notes = getCellString(row, 6);

          if (chassisNumber.isBlank()) {
            errors.add("Dòng " + (i + 1) + ": Số khung không được để trống");
            continue;
          }
          if (engineNumber.isBlank()) {
            errors.add("Dòng " + (i + 1) + ": Số máy không được để trống");
            continue;
          }
          if (carModelName.isBlank()) {
            errors.add("Dòng " + (i + 1) + ": Tên mẫu xe không được để trống");
            continue;
          }
          if (showroomName.isBlank()) {
            errors.add("Dòng " + (i + 1) + ": Tên showroom không được để trống");
            continue;
          }

          CarModel carModel = carModelRepository.findByName(carModelName)
              .orElse(null);
          if (carModel == null) {
            errors.add("Dòng " + (i + 1) + ": Không tìm thấy mẫu xe '" + carModelName + "'");
            continue;
          }

          Showroom showroom = showroomRepository.findByName(showroomName)
              .orElse(null);
          if (showroom == null) {
            errors.add("Dòng " + (i + 1) + ": Không tìm thấy showroom '" + showroomName + "'");
            continue;
          }

          if (carRepository.existsByChassisNumber(chassisNumber)) {
            errors.add("Dòng " + (i + 1) + ": Số khung '" + chassisNumber + "' đã tồn tại");
            continue;
          }
          if (carRepository.existsByEngineNumber(engineNumber)) {
            errors.add("Dòng " + (i + 1) + ": Số máy '" + engineNumber + "' đã tồn tại");
            continue;
          }

          Car car = new Car();
          car.setChassisNumber(chassisNumber);
          car.setEngineNumber(engineNumber);
          car.setLicensePlate(licensePlate.isBlank() ? null : licensePlate);
          car.setCarModel(carModel);
          car.setShowroom(showroom);
          car.setStatus(CarStatus.NEW_ARRIVAL);
          car.setArrivalDate(LocalDate.now());
          car.setNotes(notes.isBlank() ? null : notes);
          if (!salePriceStr.isBlank()) {
            car.setSalePrice(new BigDecimal(salePriceStr.replace(",", "").replace(".", "")));
          }

          carRepository.save(car);
          success++;
        } catch (Exception e) {
          errors.add("Dòng " + (i + 1) + ": " + e.getMessage());
        }
      }
    } catch (IOException e) {
      log.error("Lỗi đọc file import: {}", e.getMessage());
      throw new BadRequestException(SystemErrorCode.G7_AUTO_00100);
    }

    return new CarImportResultResponse(success, errors.size(), errors);
  }

  @Override
  public void downloadTemplate(HttpServletResponse response) {
    ExcelSupport.prepareResponse(response, ExportUtils.getFileName("mau-import-xe"));
    try (SXSSFWorkbook workbook = ExcelSupport.createWorkbook()) {
      Sheet sheet = workbook.createSheet("Template");
      String[] headers = {"Số khung *", "Số máy *", "Biển số", "Tên mẫu xe *", "Tên showroom *",
          "Giá bán", "Ghi chú"};
      Row headerRow = sheet.createRow(0);
      for (int i = 0; i < headers.length; i++) {
        headerRow.createCell(i).setCellValue(headers[i]);
      }
      workbook.write(response.getOutputStream());
    } catch (IOException e) {
      log.error("Lỗi tạo template: {}", e.getMessage());
      throw new BadRequestException(SystemErrorCode.G7_AUTO_00100);
    }
  }

  private boolean isRowEmpty(Row row) {
    for (int c = 0; c < 7; c++) {
      Cell cell = row.getCell(c);
      if (cell != null && cell.getCellType() != CellType.BLANK && !getCellString(row,
          c).isBlank()) {
        return false;
      }
    }
    return true;
  }

  private String getCellString(Row row, int col) {
    Cell cell = row.getCell(col);
    if (cell == null) {
      return "";
    }
    return switch (cell.getCellType()) {
      case STRING -> cell.getStringCellValue().trim();
      case NUMERIC -> {
        double v = cell.getNumericCellValue();
        yield v == Math.floor(v) ? String.valueOf((long) v) : String.valueOf(v);
      }
      default -> "";
    };
  }

  private Car getCar(Long id) {
    return carRepository.findById(id).orElseThrow(() -> NotFoundUtils.carIdNotFound(id));
  }
}
