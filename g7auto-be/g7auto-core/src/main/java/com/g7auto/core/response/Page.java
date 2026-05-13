package com.g7auto.core.response;

import java.util.List;
import java.util.function.Function;

public record Page<T>(
    List<T> content,
    int page,
    int size,
    long totalElements,
    int totalPages,
    String fromDate,
    String toDate
) {

  public static <T> Page<T> of(org.springframework.data.domain.Page<T> page) {
    return new Page<>(
        page.getContent(),
        page.getNumber() + 1,
        page.getSize(),
        page.getTotalElements(),
        page.getTotalPages(),
        null,
        null
    );
  }

  public static <T, U> Page<U> of(org.springframework.data.domain.Page<T> page,
      Function<T, U> mapper) {
    return new Page<>(
        page.getContent().stream().map(mapper).toList(),
        page.getNumber() + 1,
        page.getSize(),
        page.getTotalElements(),
        page.getTotalPages(),
        null,
        null
    );
  }

  public static <T, U> Page<U> of(org.springframework.data.domain.Page<T> page,
      Function<T, U> mapper,
      String fromDate, String toDate) {
    return new Page<>(
        page.getContent().stream().map(mapper).toList(),
        page.getNumber() + 1,
        page.getSize(),
        page.getTotalElements(),
        page.getTotalPages(),
        fromDate,
        toDate
    );
  }
}
