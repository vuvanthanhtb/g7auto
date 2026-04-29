package com.g7auto.core.sql;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Component;

@Component
public class PagingJdbcExecutor {

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

    String countSql = "SELECT COUNT(*) FROM (" + baseSql + ") t";

    String dataSql = baseSql +
        " ORDER BY updated_at DESC LIMIT :limit OFFSET :offset";

    Long total = jdbc.queryForObject(countSql, params, Long.class);

    Map<String, Object> pagingParams = new HashMap<>(params);
    pagingParams.put("limit", pageable.getPageSize());
    pagingParams.put("offset", pageable.getOffset());

    List<T> content = jdbc.query(dataSql, pagingParams, mapper);

    return new PageImpl<>(content, pageable, total != null ? total : 0L);
  }
}
