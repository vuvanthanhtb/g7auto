package com.g7auto.core.utils;

import com.g7auto.core.search.BaseSearchRequest;
import java.util.Arrays;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.util.StringUtils;

public final class PageableUtils {

  private static final int DEFAULT_PAGE = 1;
  private static final int DEFAULT_SIZE = 10;
  private static final int MAX_SIZE = 100;

  private PageableUtils() {
  }

  public static Pageable from(BaseSearchRequest request) {
    return of(
        request.getPage(),
        request.getSize(),
        request.getSort()
    );
  }

  public static Pageable of(Integer page, Integer size, String sort) {
    int pageIndex = normalizePage(page);
    int pageSize = normalizeSize(size);
    Sort sortObj = parseSort(sort);

    return PageRequest.of(pageIndex, pageSize, sortObj);
  }

  public static Pageable of(Integer page, Integer size) {
    return of(page, size, null);
  }

  private static int normalizePage(Integer page) {
    return Math.max((page != null ? page : DEFAULT_PAGE) - 1, 0);
  }

  private static int normalizeSize(Integer size) {
    int s = (size != null ? size : DEFAULT_SIZE);
    return Math.min(Math.max(s, 1), MAX_SIZE);
  }

  /**
   * Format: - "createdAt,desc" - "name,asc" - "createdAt,desc;name,asc"
   */
  private static Sort parseSort(String sort) {
    if (!StringUtils.hasText(sort)) {
      return Sort.by(Sort.Direction.DESC, "updatedAt");
    }

    return Sort.by(
        Arrays.stream(sort.split(";"))
            .map(thisSort -> {
              String[] parts = thisSort.split(",");
              String property = parts[0].trim();
              Sort.Direction direction = (parts.length > 1)
                  ? Sort.Direction.fromString(parts[1].trim())
                  : Sort.Direction.ASC;
              return new Sort.Order(direction, property);
            })
            .toList()
    );
  }
}