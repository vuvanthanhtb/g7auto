package com.g7auto.core.export.converter;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;

public class DefaultConverters {

  private static final Map<Class<?>, ExcelValueConverter<?>> DEFAULTS = new HashMap<>();

  static {
    DEFAULTS.put(LocalDate.class, (ExcelValueConverter<LocalDate>) value ->
        value.format(DateTimeFormatter.ofPattern("dd/MM/yyyy")));

    DEFAULTS.put(Enum.class, (ExcelValueConverter<Enum<?>>) Enum::name);
  }

  @SuppressWarnings("unchecked")
  public static <T> ExcelValueConverter<T> get(Class<?> type) {

    if (DEFAULTS.containsKey(type)) {
      return (ExcelValueConverter<T>) DEFAULTS.get(type);
    }

    if (type.isEnum()) {
      return (ExcelValueConverter<T>) DEFAULTS.get(Enum.class);
    }

    return null;
  }
}
