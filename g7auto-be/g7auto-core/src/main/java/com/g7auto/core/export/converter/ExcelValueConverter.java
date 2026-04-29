package com.g7auto.core.export.converter;

public interface ExcelValueConverter<T> {

  String convert(T value);
}