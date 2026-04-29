package com.g7auto.application.service.impl;

import com.g7auto.application.dto.request.ShowroomRequest;
import com.g7auto.application.dto.request.ShowroomSearchRequest;
import com.g7auto.application.dto.response.ImportResult;
import com.g7auto.application.dto.response.ShowroomResponse;
import com.g7auto.application.mapper.ShowroomMapper;
import com.g7auto.application.service.ShowroomService;
import com.g7auto.core.constant.codes.AuthErrorCode;
import com.g7auto.core.constant.codes.SystemErrorCode;
import com.g7auto.core.entity.ShowroomStatus;
import com.g7auto.core.exception.BadRequestException;
import com.g7auto.core.exception.ConflictException;
import com.g7auto.core.exception.NotFoundUtils;
import com.g7auto.core.export.ExcelExportHelper;
import com.g7auto.core.export.ExcelSupport;
import com.g7auto.core.response.PageResponse;
import com.g7auto.core.utils.PageableUtils;
import com.g7auto.domain.entity.Showroom;
import com.g7auto.infrastructure.persistence.ShowroomRepository;
import com.g7auto.infrastructure.persistence.query.ShowroomQueryRepository;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
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
public class ShowroomServiceImpl implements ShowroomService {

  private final ShowroomRepository showroomRepository;
  private final ShowroomQueryRepository showroomQueryRepository;
  private final ShowroomMapper showroomMapper;

  @Override
  public PageResponse<ShowroomResponse> search(ShowroomSearchRequest request) {
    Pageable pageable = PageableUtils.from(request);
    return PageResponse.of(
        showroomQueryRepository.search(request.getName(), request.getFromDate(), request.getToDate(), pageable),
        showroomMapper::toResponse,
        request.getFromDate(), request.getToDate());
  }

  @Override
  public ShowroomResponse findById(Long id) {
    return showroomMapper.toResponse(get(id));
  }

  @Override
  @Transactional
  public ShowroomResponse create(ShowroomRequest request) {
    String name = request.getName();
    if (showroomRepository.existsByName(name)) {
      log.error("Tên showroom đã tồn tại: {}", name);
      throw new ConflictException(AuthErrorCode.G7_AUTO_00210);
    }
    Showroom s = showroomMapper.toEntity(request);
    s.setStatus(ShowroomStatus.ACTIVE);
    return showroomMapper.toResponse(showroomRepository.save(s));
  }

  @Override
  @Transactional
  public ShowroomResponse update(Long id, ShowroomRequest request) {
    Showroom s = get(id);
    showroomMapper.updateEntity(request, s);
    return showroomMapper.toResponse(showroomRepository.save(s));
  }

  @Override
  @Transactional
  public void delete(Long id) {
    Showroom s = get(id);
    if (s.getStatus() == ShowroomStatus.ACTIVE) {
      log.error("Không thể xóa showroom đang hoạt động: {}", id);
      throw new BadRequestException(AuthErrorCode.G7_AUTO_00205);
    }
    showroomRepository.delete(s);
  }

  @Override
  public List<ShowroomResponse> findAllList() {
    return showroomRepository.findAll().stream().map(showroomMapper::toResponse)
        .toList();
  }

  @Override
  public ImportResult importShowrooms(MultipartFile file) {
    int total = 0, success = 0, failed = 0;
    List<String> errors = new ArrayList<>();

    try (Workbook wb = new XSSFWorkbook(file.getInputStream())) {
      Sheet sheet = wb.getSheetAt(0);
      for (int i = 1; i <= sheet.getLastRowNum(); i++) {
        Row row = sheet.getRow(i);
        if (row == null) continue;
        total++;
        try {
          ShowroomRequest req = new ShowroomRequest();
          req.setName(getCellString(row, 0));
          req.setAddress(getCellString(row, 1));
          req.setPhone(getCellString(row, 2));
          req.setEmail(getCellString(row, 3));
          req.setManager(getCellString(row, 4));
          create(req);
          success++;
        } catch (Exception e) {
          failed++;
          errors.add("Dòng " + (i + 1) + ": " + e.getMessage());
        }
      }
    } catch (IOException e) {
      log.error("Lỗi đọc file import showroom: {}", e.getMessage());
      throw new BadRequestException(SystemErrorCode.G7_AUTO_00100);
    }

    return new ImportResult(total, success, failed, errors);
  }

  @Override
  public void downloadShowroomTemplate(HttpServletResponse response) {
    ExcelSupport.prepareResponse(response, "mau-import-showroom.xlsx");
    try (SXSSFWorkbook workbook = ExcelSupport.createWorkbook()) {
      Sheet sheet = workbook.createSheet("Showrooms");
      Row header = sheet.createRow(0);
      String[] cols = {"name", "address", "phone", "email", "manager"};
      for (int i = 0; i < cols.length; i++) {
        header.createCell(i).setCellValue(cols[i]);
      }
      workbook.write(response.getOutputStream());
    } catch (IOException e) {
      log.error("Lỗi tạo template showroom: {}", e.getMessage());
      throw new BadRequestException(SystemErrorCode.G7_AUTO_00100);
    }
  }

  @Override
  public void exportShowrooms(HttpServletResponse response) {
    List<ShowroomResponse> data = showroomRepository.findAll().stream()
        .map(showroomMapper::toResponse).toList();
    ExcelExportHelper.export(response, data, ShowroomResponse.class, "DANH SÁCH SHOWROOM", "danh-sach-showroom");
  }

  private Showroom get(Long id) {
    return showroomRepository.findById(id)
        .orElseThrow(() -> NotFoundUtils.showroomNotFound(id));
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
