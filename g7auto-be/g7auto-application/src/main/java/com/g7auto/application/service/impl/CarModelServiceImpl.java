package com.g7auto.application.service.impl;

import com.g7auto.application.dto.request.CarModelRequest;
import com.g7auto.application.dto.request.CarModelSearchRequest;
import com.g7auto.application.dto.response.CarModelResponse;
import com.g7auto.application.dto.response.ImportResult;
import com.g7auto.application.mapper.CarModelMapper;
import com.g7auto.application.service.CarModelService;
import com.g7auto.core.constant.codes.SystemErrorCode;
import com.g7auto.core.entity.CarModelStatus;
import com.g7auto.core.exception.BadRequestException;
import com.g7auto.core.exception.NotFoundUtils;
import com.g7auto.core.export.ExcelExportHelper;
import com.g7auto.core.export.ExcelSupport;
import com.g7auto.core.response.PageResponse;
import com.g7auto.core.utils.PageableUtils;
import com.g7auto.domain.entity.CarModel;
import com.g7auto.infrastructure.persistence.CarModelRepository;
import com.g7auto.infrastructure.persistence.query.CarModelQueryRepository;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@Slf4j
@RequiredArgsConstructor
public class CarModelServiceImpl implements CarModelService {

  private final CarModelRepository carModelRepository;
  private final CarModelQueryRepository carModelQueryRepository;
  private final CarModelMapper carModelMapper;

  @Override
  public PageResponse<CarModelResponse> search(CarModelSearchRequest request) {
    Pageable pageable = PageableUtils.from(request);
    return PageResponse.of(
        carModelQueryRepository.search(request.getName(), request.getManufacturer(), request.getFromDate(), request.getToDate(), pageable),
        carModelMapper::toResponse,
        request.getFromDate(), request.getToDate());
  }

  @Override
  public CarModelResponse findById(Long id) {
    return carModelMapper.toResponse(get(id));
  }

  @Override
  @Transactional
  public CarModelResponse create(CarModelRequest request) {
    CarModel m = carModelMapper.toEntity(request);
    m.setStatus(CarModelStatus.ACTIVE);
    return carModelMapper.toResponse(carModelRepository.save(m));
  }

  @Override
  @Transactional
  public CarModelResponse update(Long id, CarModelRequest request) {
    CarModel m = get(id);
    carModelMapper.updateEntity(request, m);
    return carModelMapper.toResponse(carModelRepository.save(m));
  }

  @Override
  @Transactional
  public void delete(Long id) {
    CarModel m = get(id);
    m.setStatus(CarModelStatus.STOPPED);
    carModelRepository.save(m);
  }

  @Override
  public ImportResult importCarModels(MultipartFile file) {
    int total = 0, success = 0, failed = 0;
    List<String> errors = new ArrayList<>();

    try (Workbook wb = new XSSFWorkbook(file.getInputStream())) {
      Sheet sheet = wb.getSheetAt(0);
      for (int i = 1; i <= sheet.getLastRowNum(); i++) {
        Row row = sheet.getRow(i);
        if (row == null) continue;
        total++;
        try {
          CarModelRequest req = new CarModelRequest();
          req.setName(getCellString(row, 0));
          req.setManufacturer(getCellString(row, 1));
          req.setSeries(getCellString(row, 2));
          req.setYear(getCellString(row, 3));
          req.setColor(getCellString(row, 4));
          req.setCarType(getCellString(row, 5));
          req.setEngine(getCellString(row, 6));
          req.setTransmission(getCellString(row, 7));
          String priceStr = getCellString(row, 8);
          if (!priceStr.isBlank()) {
            req.setListedPrice(new BigDecimal(priceStr.replaceAll("[^\\d.]", "")));
          }
          create(req);
          success++;
        } catch (Exception e) {
          failed++;
          errors.add("Dòng " + (i + 1) + ": " + e.getMessage());
        }
      }
    } catch (IOException e) {
      log.error("Lỗi đọc file import dòng xe: {}", e.getMessage());
      throw new BadRequestException(SystemErrorCode.G7_AUTO_00100);
    }

    return new ImportResult(total, success, failed, errors);
  }

  @Override
  public void downloadCarModelTemplate(HttpServletResponse response) {
    ExcelSupport.prepareResponse(response, "mau-import-dong-xe.xlsx");
    try (SXSSFWorkbook workbook = ExcelSupport.createWorkbook()) {
      Sheet sheet = workbook.createSheet("CarModels");
      Row header = sheet.createRow(0);
      String[] cols = {"name", "manufacturer", "series", "year", "color", "carType", "engine", "transmission", "listedPrice"};
      for (int i = 0; i < cols.length; i++) {
        header.createCell(i).setCellValue(cols[i]);
      }
      workbook.write(response.getOutputStream());
    } catch (IOException e) {
      log.error("Lỗi tạo template dòng xe: {}", e.getMessage());
      throw new BadRequestException(SystemErrorCode.G7_AUTO_00100);
    }
  }

  @Override
  public void exportCarModels(HttpServletResponse response) {
    List<CarModelResponse> data = carModelRepository.findAll().stream()
        .map(carModelMapper::toResponse).toList();
    ExcelExportHelper.export(response, data, CarModelResponse.class, "DANH SÁCH DÒNG XE", "danh-sach-dong-xe");
  }

  private CarModel get(Long id) {
    return carModelRepository.findById(id).orElseThrow(() -> NotFoundUtils.carModelIdNotFound(id));
  }

  private String getCellString(Row row, int col) {
    Cell cell = row.getCell(col);
    if (cell == null) return "";
    return switch (cell.getCellType()) {
      case STRING -> cell.getStringCellValue().trim();
      case NUMERIC -> String.valueOf((long) cell.getNumericCellValue());
      default -> "";
    };
  }
}
