package com.g7auto.application.converter;

import com.g7auto.core.entity.AccountStatus;
import com.g7auto.core.export.converter.ExcelValueConverter;

public class AccountStatusConverter implements
    ExcelValueConverter<AccountStatus> {

  @Override
  public String convert(AccountStatus value) {
    if (value == null) return "";

    return switch (value) {
      case ACTIVE -> "Hoạt động";
      case INACTIVE -> "Ngừng";
      case LOCKED -> "Khoá";
    };
  }
}
