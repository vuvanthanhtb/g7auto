package com.g7auto.core.utils;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

public final class DateParserUtils {

  private static final DateTimeFormatter DATE_FORMAT =
      DateTimeFormatter.ofPattern("yyyy-MM-dd");

  private static final DateTimeFormatter DATETIME_FORMAT =
      DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

  private static final int DEFAULT_MINUS_DAYS = 30;

  private DateParserUtils() {
  }

  public static LocalDateTime parseFrom(String input) {
    if (isBlank(input)) {
      return now().minusDays(DEFAULT_MINUS_DAYS);
    }
    return parseStart(input);
  }

  public static LocalDateTime parseTo(String input) {
    if (isBlank(input)) {
      return now();
    }
    return parseEnd(input);
  }

  private static LocalDateTime parseStart(String input) {
    String value = input.trim();

    try {
      // DATE only
      if (value.length() == 10) {
        return LocalDate.parse(value, DATE_FORMAT).atStartOfDay();
      }

      // DATETIME
      return LocalDateTime.parse(value, DATETIME_FORMAT);

    } catch (DateTimeParseException e) {
      throw new IllegalArgumentException(
          "Invalid fromDate format. Expected yyyy-MM-dd or yyyy-MM-dd HH:mm:ss, but got: "
              + input, e
      );
    }
  }

  private static LocalDateTime parseEnd(String input) {
    String value = input.trim();

    try {
      // DATE only → end of day
      if (value.length() == 10) {
        return LocalDate.parse(value, DATE_FORMAT)
            .atTime(LocalTime.MAX);
      }

      // DATETIME
      return LocalDateTime.parse(value, DATETIME_FORMAT);

    } catch (DateTimeParseException e) {
      throw new IllegalArgumentException(
          "Invalid toDate format. Expected yyyy-MM-dd or yyyy-MM-dd HH:mm:ss, but got: "
              + input, e
      );
    }
  }

  private static LocalDateTime now() {
    return LocalDateTime.now();
  }

  private static boolean isBlank(String value) {
    return value == null || value.trim().isEmpty();
  }
}