package com.g7auto.core.export;

import jakarta.servlet.http.HttpServletResponse;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;

public class ExcelSupport {

  private static final String CONTENT_TYPE =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

  public static void prepareResponse(HttpServletResponse response,
      String filename) {

    response.setContentType(CONTENT_TYPE);
    response.setHeader(
        "Content-Disposition",
        "attachment; filename*=UTF-8''" + encodeFilename(filename)
    );
  }

  public static SXSSFWorkbook createWorkbook() {
    SXSSFWorkbook workbook = new SXSSFWorkbook(500);
    workbook.setCompressTempFiles(true);
    return workbook;
  }

  private static String encodeFilename(String filename) {
    try {
      return java.net.URLEncoder.encode(filename,
          java.nio.charset.StandardCharsets.UTF_8);
    } catch (Exception e) {
      return filename;
    }
  }
}