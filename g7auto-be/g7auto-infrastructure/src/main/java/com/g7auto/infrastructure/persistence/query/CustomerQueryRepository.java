package com.g7auto.infrastructure.persistence.query;

import com.g7auto.core.sql.DynamicSqlBuilder;
import com.g7auto.core.sql.PagingJdbcExecutor;
import com.g7auto.core.utils.DateParserUtils;
import com.g7auto.domain.entity.Customer;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class CustomerQueryRepository {

  private static final String BASE_SQL = """
      SELECT c.id, c.full_name, c.phone, c.email, c.address, c.birth_date,
             c.national_id, c.source_type, c.car_interest, c.assigned_employee_id, c.notes,
             c.created_at, c.updated_at, c.created_by, c.updated_by
      FROM customers c
      WHERE 1=1
      """;

  private static final RowMapper<Customer> ROW_MAPPER = (rs, rowNum) -> {
    Customer c = new Customer();
    c.setId(rs.getLong("id"));
    c.setFullName(rs.getString("full_name"));
    c.setPhone(rs.getString("phone"));
    c.setEmail(rs.getString("email"));
    c.setAddress(rs.getString("address"));
    c.setBirthDate(rs.getDate("birth_date") != null ? rs.getDate("birth_date")
        .toLocalDate() : null);
    c.setNationalId(rs.getString("national_id"));
    c.setSourceType(rs.getString("source_type"));
    c.setCarInterest(rs.getString("car_interest"));
    long empId = rs.getLong("assigned_employee_id");
    if (!rs.wasNull()) {
      c.setAssignedEmployeeId(empId);
    }
    c.setNotes(rs.getString("notes"));
    c.setCreatedAt(
        rs.getTimestamp("created_at") != null ? rs.getTimestamp("created_at")
            .toLocalDateTime() : null);
    c.setUpdatedAt(
        rs.getTimestamp("updated_at") != null ? rs.getTimestamp("updated_at")
            .toLocalDateTime() : null);
    c.setCreatedBy(rs.getString("created_by"));
    c.setUpdatedBy(rs.getString("updated_by"));
    return c;
  };

  private final PagingJdbcExecutor pagingJdbcExecutor;

  public Page<Customer> search(String fullName, String phone,
      String fromDate, String toDate, Pageable pageable) {
    DynamicSqlBuilder builder = new DynamicSqlBuilder(BASE_SQL);
    builder.andLike("c.full_name", "fullName", fullName, true, true)
        .andLike("c.phone", "phone", phone, true, true)
        .andGreaterOrEqual("c.updated_at", "fromDate", DateParserUtils.parseFrom(fromDate))
        .andSmaller("c.updated_at", "toDate", DateParserUtils.parseTo(toDate));

    return pagingJdbcExecutor.query(
        builder.getSql().toString(),
        builder.getParams(),
        pageable,
        ROW_MAPPER
    );
  }
}
