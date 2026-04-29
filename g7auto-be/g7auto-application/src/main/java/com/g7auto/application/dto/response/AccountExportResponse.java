package com.g7auto.application.dto.response;

import com.g7auto.application.converter.AccountStatusConverter;
import com.g7auto.core.entity.AccountStatus;
import com.g7auto.core.export.annotation.ExcelColumn;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AccountExportResponse {

  @ExcelColumn(header = "Tài khoản", order = 1)
  String username;

  @ExcelColumn(header = "Email", order = 2)
  String email;

  @ExcelColumn(header = "Họ và tên", order = 3)
  String fullName;

  @ExcelColumn(header = "Trạng thái", order = 4, converter = AccountStatusConverter.class)
  AccountStatus status;

  @ExcelColumn(header = "Số lần đăng nhập sai liên tiếp", order = 5, format = "#,##0.00")
  int failedLoginAttempts;

  @ExcelColumn(header = "Thời điểm tạo bản ghi", order = 6, format = "dd/MM/yyyy")
  LocalDateTime createdAt;
}

