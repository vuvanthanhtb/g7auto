package com.g7auto.core.sql;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Component;

@Component
public class PagingJdbcExecutor {

  // whitelist để tránh SQL injection ở ORDER BY
  private static final Set<String> ALLOWED_SORT_FIELDS =
      Set.of(
          "id", "name", "full_name", "phone", "email", "status", "created_at", "updated_at",
          "created_by", "updated_by", "action", "status_approving", "username", "code", "type",
          "address", "gender", "birth_date", "join_date", "employee_status", "showroom_id",
          "showroom_name", "chassis_number", "engine_number", "license_plate", "sale_price",
          "arrival_date", "year", "car_model_id", "car_model_name", "notes",
          "contract_number", "customer_name", "car_chassis_number", "employee_name",
          "sign_date", "expected_delivery_date", "actual_delivery_date",
          "contract_value", "paid_amount", "remaining_amount", "amount", "price", "date"
      );
  private final NamedParameterJdbcTemplate jdbc;

  public PagingJdbcExecutor(NamedParameterJdbcTemplate jdbc) {
    this.jdbc = jdbc;
  }

  public <T> Page<T> query(
      String baseSql,
      Map<String, Object> params,
      Pageable pageable,
      RowMapper<T> mapper
  ) {

    List<T> content = fetchData(baseSql, params, pageable, mapper);

    long total = resolveTotal(baseSql, params, pageable, content);

    return new PageImpl<>(content, pageable, total);
  }

  /**
   * Lấy data với paging
   */
  private <T> List<T> fetchData(
      String baseSql,
      Map<String, Object> params,
      Pageable pageable,
      RowMapper<T> mapper
  ) {

    String sql = buildPagingSql(baseSql, pageable);

    Map<String, Object> pagingParams = new HashMap<>(params);
    pagingParams.put("limit", pageable.getPageSize());
    pagingParams.put("offset", pageable.getOffset());

    return jdbc.query(sql, pagingParams, mapper);
  }

  /**
   * Lazy count để giảm query không cần thiết
   */
  private long resolveTotal(
      String baseSql,
      Map<String, Object> params,
      Pageable pageable,
      List<?> content
  ) {

    int pageSize = pageable.getPageSize();

    // Case 1: page đầu và data < pageSize → không cần count
    if (pageable.getPageNumber() == 0 && content.size() < pageSize) {
      return content.size();
    }

    // Case 2: page sau nhưng không có data → total = offset
    if (content.isEmpty()) {
      return pageable.getOffset();
    }

    // Case 3: cần count thật
    return count(baseSql, params);
  }

  private long count(String baseSql, Map<String, Object> params) {
    String countSql = String.format("SELECT COUNT(*) FROM (%s) t", baseSql);
    Long total = jdbc.queryForObject(countSql, params, Long.class);
    return total != null ? total : 0L;
  }

  /**
   * Build SQL có ORDER + LIMIT/OFFSET
   */
  private String buildPagingSql(String baseSql, Pageable pageable) {
    StringBuilder sql = new StringBuilder(baseSql);

    String orderBy = buildOrderBy(pageable.getSort());
    if (!orderBy.isEmpty()) {
      sql.append(" ORDER BY ").append(orderBy);
    } else {
      sql.append(" ORDER BY updated_at DESC"); // default
    }

    sql.append(" LIMIT :limit OFFSET :offset");

    return sql.toString();
  }

  /**
   * Build ORDER BY an toàn
   */
  private String buildOrderBy(Sort sort) {
    if (sort == null || sort.isUnsorted()) {
      return "";
    }

    return sort.stream()
        .map(order -> {
          String property = toSnakeCase(order.getProperty());

          if (!ALLOWED_SORT_FIELDS.contains(property)) {
            throw new IllegalArgumentException("Invalid sort field: " + property);
          }

          return property + " " + order.getDirection().name();
        })
        .collect(Collectors.joining(", "));
  }

  private String toSnakeCase(String str) {
    if (str == null) {
      return null;
    }
    return str.replaceAll("([a-z])([A-Z]+)", "$1_$2").toLowerCase();
  }
}