package com.g7auto.core.export.converter;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class ExcelConverterRegistry {

  private static final Map<Class<?>, ExcelValueConverter<?>> CACHE = new ConcurrentHashMap<>();

  @SuppressWarnings("unchecked")
  public static <T> ExcelValueConverter<T> get(Class<? extends ExcelValueConverter<?>> clazz) {

    return (ExcelValueConverter<T>) CACHE.computeIfAbsent(clazz, key -> {
      try {
        return (ExcelValueConverter<?>) key.getDeclaredConstructor().newInstance();
      } catch (Exception e) {
        throw new RuntimeException("Cannot init converter: " + key, e);
      }
    });
  }
}