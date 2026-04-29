package com.g7auto.core.export;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class ExcelFileNameBuilder {

  public static String build(String baseName) {
    return baseName + " - " +
        LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd-MM-yyyy HHmm")) +
        ".xlsx";
  }

  public static String build(String baseName, String suffix) {
    return baseName + " - " + suffix + ".xlsx";
  }
}