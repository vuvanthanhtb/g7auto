package com.g7auto.core.export;

import com.g7auto.core.export.converter.ExcelValueConverter;
import com.g7auto.core.export.meta.ExcelFieldMeta;
import com.g7auto.core.export.meta.ExcelMetaCache;
import java.io.OutputStream;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.ss.usermodel.BorderStyle;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.DataFormat;
import org.apache.poi.ss.usermodel.FillPatternType;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.VerticalAlignment;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.streaming.SXSSFSheet;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;

@Slf4j
public class ExcelExportEngine {

  private final SXSSFWorkbook workbook;

  private final Map<String, SheetContext> sheets = new HashMap<>();
  private final Map<Class<?>, ExcelValueConverter<?>> runtimeConverters = new HashMap<>();

  private final Map<String, CellStyle> numberStyleCache = new HashMap<>();
  private final Map<String, CellStyle> dateStyleCache = new HashMap<>();

  private SheetContext currentSheet;

  private CellStyle titleStyle;
  private CellStyle subtitleStyle;
  private CellStyle headerStyle;
  private CellStyle groupHeaderStyle;
  private CellStyle textStyle;
  private CellStyle dateStyle;
  private CellStyle numberStyle;

  public ExcelExportEngine(SXSSFWorkbook workbook) {
    this.workbook = workbook;
    initStyles();
  }

  private void initStyles() {
    initTitleStyle();
    initSubtitleStyle();
    initHeaderStyle();
    initGroupHeaderStyle();
    initTextStyle();
    initNumberStyle();
    initDateStyle();
  }

  private void applyBorder(CellStyle style) {
    style.setBorderTop(BorderStyle.THIN);
    style.setBorderBottom(BorderStyle.THIN);
    style.setBorderLeft(BorderStyle.THIN);
    style.setBorderRight(BorderStyle.THIN);
  }

  private void initTitleStyle() {
    Font font = workbook.createFont();
    font.setBold(true);
    font.setFontHeightInPoints((short) 16);
    font.setFontName("Times New Roman");

    CellStyle style = workbook.createCellStyle();
    style.setFont(font);
    style.setAlignment(HorizontalAlignment.CENTER);
    style.setVerticalAlignment(VerticalAlignment.CENTER);

    this.titleStyle = style;
  }

  private void initSubtitleStyle() {
    Font font = workbook.createFont();
    font.setFontHeightInPoints((short) 12);
    font.setFontName("Times New Roman");

    CellStyle style = workbook.createCellStyle();
    style.setFont(font);
    style.setAlignment(HorizontalAlignment.CENTER);
    style.setVerticalAlignment(VerticalAlignment.CENTER);
    style.setWrapText(true);

    this.subtitleStyle = style;
  }

  private void initHeaderStyle() {
    Font font = workbook.createFont();
    font.setBold(true);
    font.setFontName("Times New Roman");

    CellStyle style = workbook.createCellStyle();
    style.setFont(font);
    style.setAlignment(HorizontalAlignment.CENTER);
    style.setVerticalAlignment(VerticalAlignment.CENTER);
    style.setWrapText(true);
    style.setFillForegroundColor(IndexedColors.GREY_25_PERCENT.getIndex());
    style.setFillPattern(FillPatternType.SOLID_FOREGROUND);

    applyBorder(style);
    this.headerStyle = style;
  }

  private void initGroupHeaderStyle() {
    Font font = workbook.createFont();
    font.setBold(true);
    font.setFontName("Times New Roman");

    CellStyle style = workbook.createCellStyle();
    style.setFont(font);
    style.setAlignment(HorizontalAlignment.CENTER);
    style.setVerticalAlignment(VerticalAlignment.CENTER);
    style.setWrapText(true);

    style.setFillForegroundColor(IndexedColors.GREY_40_PERCENT.getIndex());
    style.setFillPattern(FillPatternType.SOLID_FOREGROUND);

    applyBorder(style);
    this.groupHeaderStyle = style;
  }

  private void initTextStyle() {
    CellStyle style = workbook.createCellStyle();
    style.setAlignment(HorizontalAlignment.LEFT);
    style.setVerticalAlignment(VerticalAlignment.CENTER);
    style.setWrapText(true);

    applyBorder(style);
    this.textStyle = style;
  }

  private void initNumberStyle() {
    DataFormat df = workbook.createDataFormat();

    CellStyle style = workbook.createCellStyle();
    style.setDataFormat(df.getFormat("#,##0"));
    style.setAlignment(HorizontalAlignment.RIGHT);
    style.setVerticalAlignment(VerticalAlignment.CENTER);

    applyBorder(style);
    this.numberStyle = style;
  }

  private void initDateStyle() {
    DataFormat df = workbook.createDataFormat();

    CellStyle style = workbook.createCellStyle();
    style.setDataFormat(df.getFormat("dd/MM/yyyy"));
    style.setAlignment(HorizontalAlignment.CENTER);

    applyBorder(style);
    this.dateStyle = style;
  }

  private CellStyle getOrCreateNumberStyle(String format) {
    return numberStyleCache.computeIfAbsent(format, f -> {
      DataFormat df = workbook.createDataFormat();
      CellStyle style = workbook.createCellStyle();
      style.setDataFormat(df.getFormat(f));
      style.setAlignment(HorizontalAlignment.RIGHT);
      applyBorder(style);
      return style;
    });
  }

  private CellStyle getOrCreateDateStyle(String format) {
    return dateStyleCache.computeIfAbsent(format, f -> {
      DataFormat df = workbook.createDataFormat();
      CellStyle style = workbook.createCellStyle();
      style.setDataFormat(df.getFormat(f));
      style.setAlignment(HorizontalAlignment.CENTER);
      applyBorder(style);
      return style;
    });
  }

  private int getMaxColumn() {
    if (currentSheet.totalColumns > 0) {
      return currentSheet.totalColumns - 1;
    }
    return 10;
  }

  private void mergeFullRow(Row row) {
    int lastCol = getMaxColumn();
    if (lastCol > 0) {
      currentSheet.sheet.addMergedRegion(
          new CellRangeAddress(row.getRowNum(), row.getRowNum(), 0, lastCol)
      );
    }
  }

  @SuppressWarnings("unchecked")
  private Object applyConverter(Object value) {
    if (value == null) {
      return null;
    }

    for (Map.Entry<Class<?>, ExcelValueConverter<?>> entry : runtimeConverters.entrySet()) {
      if (entry.getKey().isAssignableFrom(value.getClass())) {
        return ((ExcelValueConverter<Object>) entry.getValue()).convert(value);
      }
    }
    return value;
  }

  public ExcelExportEngine useSheet(String name, int startRow) {
    SheetContext ctx = sheets.get(name);

    if (ctx == null) {
      Sheet sheet = workbook.getSheet(name);
      if (sheet == null) {
        sheet = workbook.createSheet(name);
      }
      ctx = new SheetContext(name, sheet, startRow);
      sheets.put(name, ctx);
    }

    this.currentSheet = ctx;
    return this;
  }

  private void checkSheet() {
    if (currentSheet == null) {
      throw new IllegalStateException("Call useSheet() first");
    }
  }

  public ExcelExportEngine writeTitle(String title) {
    checkSheet();

    Row row = currentSheet.sheet.createRow(currentSheet.rowIndex++);
    row.setHeightInPoints(28);

    Cell cell = row.createCell(0);
    cell.setCellValue(title);
    cell.setCellStyle(titleStyle);

    mergeFullRow(row);
    return this;
  }

  public ExcelExportEngine writeSubtitle(String subtitle) {
    checkSheet();

    Row row = currentSheet.sheet.createRow(currentSheet.rowIndex++);
    row.setHeightInPoints(20);

    Cell cell = row.createCell(0);
    cell.setCellValue(subtitle);
    cell.setCellStyle(subtitleStyle);

    mergeFullRow(row);
    return this;
  }

  public ExcelExportEngine writeGroupHeader(List<HeaderGroup> groups) {
    checkSheet();

    Row row = currentSheet.sheet.createRow(currentSheet.rowIndex++);
    row.setHeightInPoints(22);

    for (HeaderGroup group : groups) {

      Cell cell = row.createCell(group.fromCol());
      cell.setCellValue(group.title());
      cell.setCellStyle(groupHeaderStyle);

      currentSheet.sheet.addMergedRegion(
          new CellRangeAddress(
              row.getRowNum(),
              row.getRowNum(),
              group.fromCol(),
              group.toCol()
          )
      );

      for (int col = group.fromCol(); col <= group.toCol(); col++) {
        Cell c = row.getCell(col);
        if (c == null) {
          c = row.createCell(col);
        }
        c.setCellStyle(groupHeaderStyle);
      }
    }

    return this;
  }

  public <T> ExcelExportEngine writeHeader(Class<T> clazz) {
    checkSheet();

    List<ExcelFieldMeta> metas = ExcelMetaCache.getMeta(clazz);
    currentSheet.totalColumns = metas.size() + 1;

    if (currentSheet.sheet instanceof SXSSFSheet sxssfSheet) {
      for (int i = 0; i < currentSheet.totalColumns; i++) {
        sxssfSheet.trackColumnForAutoSizing(i);
      }
    }

    Row row = currentSheet.sheet.createRow(currentSheet.rowIndex++);

    int col = 0;

    Cell stt = row.createCell(col++);
    stt.setCellValue("STT");
    stt.setCellStyle(headerStyle);

    for (ExcelFieldMeta meta : metas) {
      Cell cell = row.createCell(col++);
      cell.setCellValue(meta.getColumn().header());
      cell.setCellStyle(headerStyle);
    }

    return this;
  }

  public <T> void writeObject(int stt, T data) {
    checkSheet();

    List<ExcelFieldMeta> metas = ExcelMetaCache.getMeta(data.getClass());

    Row row = currentSheet.sheet.createRow(currentSheet.rowIndex++);

    int col = 0;

    Cell sttCell = row.createCell(col++);
    sttCell.setCellValue(stt);
    sttCell.setCellStyle(numberStyle);

    for (ExcelFieldMeta meta : metas) {

      Cell cell = row.createCell(col++);
      Object value = applyConverter(meta.getValue(data));

      if (value == null) {
        cell.setCellValue("");
        continue;
      }

      if (value instanceof Number n) {
        cell.setCellValue(n.doubleValue());
        String format = meta.getColumn().format();
        cell.setCellStyle(
            (format == null || format.isEmpty())
                ? numberStyle
                : getOrCreateNumberStyle(format)
        );
      } else if (value instanceof Boolean b) {
        cell.setCellValue(b);
      } else if (value instanceof Date d) {
        cell.setCellValue(d);
        cell.setCellStyle(dateStyle);
      } else if (value instanceof LocalDate ld) {
        cell.setCellValue(java.sql.Date.valueOf(ld));
        cell.setCellStyle(dateStyle);
      } else if (value instanceof LocalDateTime ldt) {
        cell.setCellValue(java.sql.Timestamp.valueOf(ldt));
        cell.setCellStyle(dateStyle);
      } else {
        cell.setCellValue(value.toString());
        cell.setCellStyle(textStyle);
      }
    }
  }

  public <T> ExcelExportEngine writeList(List<T> list) {
    int i = 1;
    for (T item : list) {
      writeObject(i++, item);
    }
    return this;
  }

  private void autoSizeAllSheets() {
    for (SheetContext sc : sheets.values()) {

      if (sc.totalColumns <= 0) {
        continue;
      }

      for (int col = 0; col < sc.totalColumns; col++) {
        try {
          sc.sheet.autoSizeColumn(col);

          int width = sc.sheet.getColumnWidth(col);
          int maxWidth = 50 * 256;

          if (width > maxWidth) {
            sc.sheet.setColumnWidth(col, maxWidth);
          }

        } catch (Exception e) {
          log.warn("Auto size failed sheet={}, col={}", sc.name, col, e);
        }
      }
    }
  }

  public void writeTo(OutputStream os) {
    try {
      autoSizeAllSheets();
      workbook.write(os);
    } catch (Exception e) {
      throw new RuntimeException(e);
    } finally {
      close();
    }
  }

  public void close() {
    try {
      workbook.close();
    } catch (Exception e) {
      log.warn("Close error", e);
    }
  }

  public <T> ExcelExportEngine registerConverter(Class<T> type, ExcelValueConverter<T> converter) {
    runtimeConverters.put(type, converter);
    return this;
  }

  public record HeaderGroup(String title, int fromCol, int toCol) {

  }

  private static class SheetContext {

    String name;
    Sheet sheet;
    int rowIndex;
    int totalColumns;

    SheetContext(String name, Sheet sheet, int startRow) {
      this.name = name;
      this.sheet = sheet;
      this.rowIndex = startRow;
    }
  }
}