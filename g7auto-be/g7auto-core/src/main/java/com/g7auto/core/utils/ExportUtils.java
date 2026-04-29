package com.g7auto.core.utils;

import java.util.Date;

public class ExportUtils {

  public static String contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
  public static String accessControlExposeHeaders = "Access-Control-Expose-Headers";
  public static String contentDisposition = "Content-Disposition";

  public static String getFileName(String name) {
    return DateUtils.dateToString(new Date(), "yyyyMMdd") + "_" + name + ".xlsx";
  }
}
