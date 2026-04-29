package com.g7auto.core.export.annotation;

import com.g7auto.core.export.converter.ExcelValueConverter;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.FIELD)
public @interface ExcelColumn {

  String header();

  int order();

  String format() default "";

  Class<? extends ExcelValueConverter<?>> converter() default Default.class;

  class Default implements ExcelValueConverter<Object> {

    @Override
    public String convert(Object value) {
      return value == null ? "" : value.toString();
    }
  }
}