package com.g7auto.application.service.impl;

import com.g7auto.application.dto.request.AccountSearchRequest;
import com.g7auto.application.dto.response.AccountExportResponse;
import com.g7auto.application.dto.response.AccountResponse;
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
import com.g7auto.infrastructure.persistence.AccountRepository;
import com.g7auto.infrastructure.persistence.query.AccountQueryRepository;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AccountServiceImpl implements AccountService {

  final AccountRepository accountRepository;
  final AccountQueryRepository accountQueryRepository;
  final AccountMapper accountMapper;

  @Override
  public PageResponse<AccountResponse> search(AccountSearchRequest request) {
    Pageable pageable = PageableUtils.from(request);

    Page<Account> accounts = accountQueryRepository.search(
        request.getUsername(), request.getFullName(), request.getStatus(), request.getFromDate()
        , request.getToDate(),
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

  Account get(Long id) {
    return accountRepository.findById(id).orElseThrow(() -> NotFoundUtils.accountIdNotFound(id));
  }
}
