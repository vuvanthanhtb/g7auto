package com.g7auto.core.export.meta;

import com.g7auto.core.export.annotation.ExcelColumn;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class ExcelMetaCache {

  private static final Map<Class<?>, List<ExcelFieldMeta>> CACHE = new ConcurrentHashMap<>();

  public static List<ExcelFieldMeta> getMeta(Class<?> clazz) {
    return CACHE.computeIfAbsent(clazz, ExcelMetaCache::parse);
  }

  private static List<ExcelFieldMeta> parse(Class<?> clazz) {

    List<ExcelFieldMeta> result = new ArrayList<>();

    for (Field field : clazz.getDeclaredFields()) {
      ExcelColumn column = field.getAnnotation(ExcelColumn.class);

      if (column == null) {
        continue;
      }

      field.setAccessible(true);

      result.add(new ExcelFieldMeta(field, column));
    }

    result.sort(Comparator.comparingInt(m -> m.getColumn().order()));

    return result;
  }
}