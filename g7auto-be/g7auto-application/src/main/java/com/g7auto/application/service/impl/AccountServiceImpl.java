package com.g7auto.application.service.impl;

import com.g7auto.application.dto.request.AccountRequest;
import com.g7auto.application.dto.request.AccountSearchRequest;
import com.g7auto.application.dto.response.AccountExportResponse;
import com.g7auto.application.dto.response.AccountResponse;
import com.g7auto.application.dto.response.ImportResult;
import com.g7auto.application.mapper.AccountMapper;
import com.g7auto.application.service.AccountService;
import com.g7auto.core.constant.codes.SystemErrorCode;
import com.g7auto.core.exception.BadRequestException;
import com.g7auto.core.exception.NotFoundUtils;
import com.g7auto.core.export.ExcelExportEngine;
import com.g7auto.core.export.ExcelSupport;
import com.g7auto.core.response.PageResponse;
import com.g7auto.core.utils.ExportUtils;
import com.g7auto.core.utils.PageableUtils;
import com.g7auto.domain.entity.Account;
import com.g7auto.domain.entity.AccountApproving;
import com.g7auto.infrastructure.persistence.AccountApprovingRepository;
import com.g7auto.infrastructure.persistence.AccountRepository;
import com.g7auto.infrastructure.persistence.query.AccountQueryRepository;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AccountServiceImpl implements AccountService {

  final AccountRepository accountRepository;
  final AccountQueryRepository accountQueryRepository;
  final AccountMapper accountMapper;
  final PasswordEncoder passwordEncoder;
  final AccountApprovingRepository accountApprovingRepository;

  @Override
  public PageResponse<AccountResponse> search(AccountSearchRequest request) {
    Pageable pageable = PageableUtils.from(request);

    Page<Account> accounts = accountQueryRepository.search(
        request.getUsername(), request.getFullName(), request.getFromDate(), request.getToDate(),
        pageable);

    return PageResponse.of(accounts, accountMapper::toResponse,
        request.getFromDate(), request.getToDate());
  }

  @Override
  public AccountResponse findById(Long id) {
    return accountMapper.toResponse(get(id));
  }

  @Override
  public void exportAccounts(HttpServletResponse response) {

    List<AccountExportResponse> data =
        accountRepository.findAll().stream().map(accountMapper::toExport).toList();

    ExcelSupport.prepareResponse(response, ExportUtils.getFileName("danh-sach-tai-khoan"));

    SXSSFWorkbook workbook = ExcelSupport.createWorkbook();

    ExcelExportEngine engine = new ExcelExportEngine(workbook);

    try {
      String exportDate = java.time.LocalDate.now()
          .format(java.time.format.DateTimeFormatter.ofPattern("dd/MM/yyyy"));

      engine
          .useSheet("Accounts", 0)
          .writeTitle("DANH SÁCH TÀI KHOẢN")
          .writeSubtitle("Ngày xuất: " + exportDate)
          .writeGroupHeader(List.of(
              new ExcelExportEngine.HeaderGroup("Thông tin cá nhân", 0, 3),
              new ExcelExportEngine.HeaderGroup("Trạng thái", 4, 6)
          ))
          .writeHeader(AccountExportResponse.class)
          .writeList(data)
          .writeTo(response.getOutputStream());
    } catch (IOException exception) {
      log.error("Lỗi xuất báo cáo: {}", exception.getMessage());
      throw new BadRequestException(SystemErrorCode.G7_AUTO_00100);
    }
  }

  @Override
  public ImportResult importAccounts(MultipartFile file) {
    int total = 0, success = 0, failed = 0;
    List<String> errors = new ArrayList<>();

    try (Workbook wb = new XSSFWorkbook(file.getInputStream())) {
      Sheet sheet = wb.getSheetAt(0);
      for (int i = 1; i <= sheet.getLastRowNum(); i++) {
        Row row = sheet.getRow(i);
        if (row == null) {
          continue;
        }
        total++;
        try {
          AccountRequest req = new AccountRequest();
          req.setUsername(getCellString(row, 0));
          req.setEmail(getCellString(row, 1));
          req.setFullName(getCellString(row, 2));
          req.setPassword(getCellString(row, 3));
//          create(req);
          success++;
        } catch (Exception e) {
          failed++;
          errors.add("Dòng " + (i + 1) + ": " + e.getMessage());
        }
      }
    } catch (IOException e) {
      log.error("Lỗi đọc file import tài khoản: {}", e.getMessage());
      throw new BadRequestException(SystemErrorCode.G7_AUTO_00100);
    }

    return new ImportResult(total, success, failed, errors);
  }

  @Override
  public void downloadAccountTemplate(HttpServletResponse response) {
    ExcelSupport.prepareResponse(response, ExportUtils.getFileName("mau-import-tai-khoan"));
    try (SXSSFWorkbook workbook = ExcelSupport.createWorkbook()) {
      org.apache.poi.ss.usermodel.Sheet sheet = workbook.createSheet("Accounts");
      org.apache.poi.ss.usermodel.Row header = sheet.createRow(0);
      String[] cols = {"username", "email", "fullName", "password"};
      for (int i = 0; i < cols.length; i++) {
        header.createCell(i).setCellValue(cols[i]);
      }
      workbook.write(response.getOutputStream());
    } catch (IOException e) {
      log.error("Lỗi tạo template: {}", e.getMessage());
      throw new BadRequestException(SystemErrorCode.G7_AUTO_00100);
    }
  }

  String getCellString(Row row, int col) {
    Cell cell = row.getCell(col);
    if (cell == null) {
      return "";
    }
    return switch (cell.getCellType()) {
      case STRING -> cell.getStringCellValue().trim();
      case NUMERIC -> String.valueOf((long) cell.getNumericCellValue());
      default -> "";
    };
  }

  Account get(Long id) {
    return accountRepository.findById(id).orElseThrow(() -> NotFoundUtils.accountIdNotFound(id));
  }

  AccountApproving getAccountApproving(String username) {
    return accountApprovingRepository.findByUsername(username).orElse(null);
  }
}
