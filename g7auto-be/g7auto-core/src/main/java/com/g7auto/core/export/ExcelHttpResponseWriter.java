package com.g7auto.core.export;

import jakarta.servlet.http.HttpServletResponse;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class ExcelHttpResponseWriter {

  private static final String CONTENT_TYPE =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

  public static void write(
      HttpServletResponse response,
      String fileName,
      ExcelExportEngine engine
  ) {

    try {
      response.setContentType(CONTENT_TYPE);
      response.setCharacterEncoding("UTF-8");

      String encodedFileName = URLEncoder.encode(fileName, StandardCharsets.UTF_8)
          .replaceAll("\\+", "%20");

      String safeFileName = fileName.replaceAll("[\\r\\n\"]", "");

      response.setHeader(
          "Content-Disposition",
          "attachment; filename=\"" + safeFileName + "\"; " +
              "filename*=UTF-8''" + encodedFileName
      );

      try (OutputStream os = response.getOutputStream()) {
        engine.writeTo(os);
        os.flush();
      }

    } catch (Exception e) {
      throw new RuntimeException("Export Excel failed", e);
    }
  }
}