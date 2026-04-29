package com.g7auto.core.utils;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

public final class SmartDateTimeUtils {

  private static final DateTimeFormatter DATE = DateTimeFormatter.ofPattern("yyyy-MM-dd");
  private static final DateTimeFormatter DATETIME = DateTimeFormatter.ofPattern(
      "yyyy-MM-dd HH:mm:ss");
  private static final DateTimeFormatter TIME = DateTimeFormatter.ofPattern("HH:mm:ss");
  private static final DateTimeFormatter TIME_SHORT = DateTimeFormatter.ofPattern("HH:mm");
  private SmartDateTimeUtils() {
  }

  public static DateTimeRange resolve(String from, String to) {
    LocalDate baseDate = LocalDate.now();
    LocalDateTime toTime = parseTo(to, baseDate);
    LocalDateTime fromTime = parseFrom(from, toTime.toLocalDate());

    if (fromTime == null) {
      fromTime = toTime.minusMonths(1);
    }

    if (fromTime.isAfter(toTime)) {
      toTime = toTime.plusDays(1);
    }

    return new DateTimeRange(fromTime, toTime);
  }

  private static LocalDateTime parseFrom(String from, LocalDate fallbackDate) {
    if (!hasText(from)) {
      return null;
    }
    String v = from.trim();
    return switch (detect(v)) {
      case DATETIME -> LocalDateTime.parse(v, DATETIME);
      case DATE -> LocalDate.parse(v, DATE).atStartOfDay();
      case TIME -> parseTime(v).atDate(fallbackDate);
    };
  }

  private static LocalDateTime parseTo(String to, LocalDate baseDate) {
    if (!hasText(to)) {
      return LocalDateTime.now();
    }
    String v = to.trim();
    return switch (detect(v)) {
      case DATETIME -> LocalDateTime.parse(v, DATETIME);
      case DATE -> LocalDate.parse(v, DATE).atTime(LocalTime.MAX);
      case TIME -> parseTime(v).atDate(baseDate);
    };
  }

  private static DateInputType detect(String value) {
    int len = value.length();
    if (len <= 8) {
      return DateInputType.TIME;
    }
    if (len == 10) {
      return DateInputType.DATE;
    }
    return DateInputType.DATETIME;
  }

  private static LocalTime parseTime(String value) {
    return value.length() == 5
        ? LocalTime.parse(value, TIME_SHORT)
        : LocalTime.parse(value, TIME);
  }

  private static boolean hasText(String value) {
    return value != null && !value.isBlank();
  }

  private enum DateInputType {DATE, DATETIME, TIME}

  public record DateTimeRange(LocalDateTime from, LocalDateTime to) {

  }
}
