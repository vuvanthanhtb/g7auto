package com.g7auto.application.mapper;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import org.mapstruct.Mapper;
import org.mapstruct.Named;

@Mapper(componentModel = "spring")
public interface DateMapper {

  DateTimeFormatter FMT = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");

  @Named("formatDateTime")
  default String formatDateTime(LocalDateTime dt) {
    return dt == null ? null : dt.format(FMT);
  }
}
