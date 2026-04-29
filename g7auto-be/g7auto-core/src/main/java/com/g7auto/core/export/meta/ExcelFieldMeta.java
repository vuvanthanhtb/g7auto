package com.g7auto.core.export.meta;

import com.g7auto.core.export.annotation.ExcelColumn;
import com.g7auto.core.export.converter.ExcelConverterRegistry;
import com.g7auto.core.export.converter.ExcelValueConverter;
import java.lang.reflect.Field;
import lombok.Getter;

@Getter
public class ExcelFieldMeta {

  private final Field field;
  private final ExcelColumn column;
  private final ExcelValueConverter<?> converter;

  public ExcelFieldMeta(Field field, ExcelColumn column) {
    this.field = field;
    this.column = column;
    this.converter = resolveConverter(column);
  }

  private ExcelValueConverter<?> resolveConverter(ExcelColumn column) {

    if (column.converter() == ExcelColumn.Default.class) {
      return null;
    }

    return ExcelConverterRegistry.get(column.converter());
  }

  @SuppressWarnings("unchecked")
  public Object getValue(Object obj) {
    try {
      Object value = field.get(obj);

      if (value == null) {
        return null;
      }

      if (converter != null) {
        return ((ExcelValueConverter<Object>) converter).convert(value);
      }

      return value;

    } catch (Exception e) {
      throw new RuntimeException(e);
    }
  }
}