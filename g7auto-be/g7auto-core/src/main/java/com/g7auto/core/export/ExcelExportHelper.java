package com.g7auto.core.export;

import com.g7auto.core.constant.codes.SystemErrorCode;
import com.g7auto.core.exception.BadRequestException;
import com.g7auto.core.utils.ExportUtils;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;

@Slf4j
public class ExcelExportHelper {

  public static <T> void export(
      HttpServletResponse response,
      List<T> data,
      Class<T> clazz,
      String title,
      String filename) {

    ExcelSupport.prepareResponse(response, ExportUtils.getFileName(filename));
    SXSSFWorkbook workbook = ExcelSupport.createWorkbook();
    ExcelExportEngine engine = new ExcelExportEngine(workbook);
    try {
      String exportDate = LocalDate.now().format(DateTimeFormatter.ofPattern("dd/MM/yyyy"));
      engine
          .useSheet("Data", 0)
          .writeTitle(title)
          .writeSubtitle("Ngày xuất: " + exportDate)
          .writeHeader(clazz)
          .writeList(data)
          .writeTo(response.getOutputStream());
    } catch (IOException e) {
      log.error("Lỗi xuất báo cáo {}: {}", filename, e.getMessage());
      throw new BadRequestException(SystemErrorCode.G7_AUTO_00100);
    }
  }
}
