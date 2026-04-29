package com.g7auto.infrastructure.persistence.query;

import com.g7auto.core.entity.ShowroomStatus;
import com.g7auto.core.sql.DynamicSqlBuilder;
import com.g7auto.core.sql.PagingJdbcExecutor;
import com.g7auto.core.utils.DateParserUtils;
import com.g7auto.domain.entity.Showroom;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class ShowroomQueryRepository {

  private static final String BASE_SQL = """
      SELECT s.id, s.name, s.address, s.phone, s.email, s.manager, s.status,
             s.created_at, s.updated_at, s.created_by, s.updated_by
      FROM showrooms s
      WHERE 1=1
      """;

  private static final RowMapper<Showroom> ROW_MAPPER = (rs, rowNum) -> {
    Showroom s = new Showroom();
    s.setId(rs.getLong("id"));
    s.setName(rs.getString("name"));
    s.setAddress(rs.getString("address"));
    s.setPhone(rs.getString("phone"));
    s.setEmail(rs.getString("email"));
    s.setManager(rs.getString("manager"));
    String status = rs.getString("status");
    if (status != null) {
      s.setStatus(ShowroomStatus.valueOf(status));
    }
    s.setCreatedAt(
        rs.getTimestamp("created_at") != null ? rs.getTimestamp("created_at")
            .toLocalDateTime() : null);
    s.setUpdatedAt(
        rs.getTimestamp("updated_at") != null ? rs.getTimestamp("updated_at")
            .toLocalDateTime() : null);
    s.setCreatedBy(rs.getString("created_by"));
    s.setUpdatedBy(rs.getString("updated_by"));
    return s;
  };

  private final PagingJdbcExecutor pagingJdbcExecutor;

  public Page<Showroom> search(String name, String fromDate, String toDate, Pageable pageable) {
    DynamicSqlBuilder builder = new DynamicSqlBuilder(BASE_SQL);
    builder.andLike("s.name", "name", name, true, true)
        .andGreaterOrEqual("s.updated_at", "fromDate", DateParserUtils.parseFrom(fromDate))
        .andSmaller("s.updated_at", "toDate", DateParserUtils.parseTo(toDate));

    return pagingJdbcExecutor.query(
        builder.getSql().toString(),
        builder.getParams(),
        pageable,
        ROW_MAPPER
    );
  }
}
