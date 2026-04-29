package com.g7auto.infrastructure.persistence.query;

import com.g7auto.core.entity.EmployeeStatus;
import com.g7auto.core.sql.DynamicSqlBuilder;
import com.g7auto.core.sql.PagingJdbcExecutor;
import com.g7auto.core.utils.DateParserUtils;
import com.g7auto.domain.entity.Employee;
import com.g7auto.domain.entity.Showroom;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class EmployeeQueryRepository {

  private static final String BASE_SQL = """
      SELECT e.id, e.full_name, e.phone, e.email, e.address, e.birth_date,
             e.gender, e.national_id, e.join_date, e.employee_status,
             e.showroom_id, s.name AS showroom_name,
             e.account_id,
             e.created_at, e.updated_at, e.created_by, e.updated_by
      FROM employees e
      LEFT JOIN showrooms s ON e.showroom_id = s.id
      WHERE 1=1
      """;

  private static final RowMapper<Employee> ROW_MAPPER = (rs, rowNum) -> {
    Employee e = new Employee();
    e.setId(rs.getLong("id"));
    e.setFullName(rs.getString("full_name"));
    e.setPhone(rs.getString("phone"));
    e.setEmail(rs.getString("email"));
    e.setAddress(rs.getString("address"));
    e.setBirthDate(rs.getDate("birth_date") != null ? rs.getDate("birth_date")
        .toLocalDate() : null);
    e.setGender(rs.getString("gender"));
    e.setNationalId(rs.getString("national_id"));
    e.setJoinDate(
        rs.getDate("join_date") != null ? rs.getDate("join_date").toLocalDate()
            : null);
    String status = rs.getString("employee_status");
    if (status != null) {
      e.setEmployeeStatus(EmployeeStatus.valueOf(status));
    }

    long showroomId = rs.getLong("showroom_id");
    if (!rs.wasNull()) {
      Showroom showroom = new Showroom();
      showroom.setId(showroomId);
      showroom.setName(rs.getString("showroom_name"));
      e.setShowroom(showroom);
    }

    e.setCreatedAt(
        rs.getTimestamp("created_at") != null ? rs.getTimestamp("created_at")
            .toLocalDateTime() : null);
    e.setUpdatedAt(
        rs.getTimestamp("updated_at") != null ? rs.getTimestamp("updated_at")
            .toLocalDateTime() : null);
    e.setCreatedBy(rs.getString("created_by"));
    e.setUpdatedBy(rs.getString("updated_by"));
    return e;
  };

  private final PagingJdbcExecutor pagingJdbcExecutor;

  public Page<Employee> search(String fullName, Long showroomId,
      String employeeStatus,
      String fromDate, String toDate, Pageable pageable) {
    DynamicSqlBuilder builder = new DynamicSqlBuilder(BASE_SQL);
    builder.andLike("e.full_name", "fullName", fullName, true, true)
        .andEqual("e.showroom_id", "showroomId", showroomId)
        .andEqual("e.employee_status", "employeeStatus", employeeStatus)
        .andGreaterOrEqual("e.updated_at", "fromDate", DateParserUtils.parseFrom(fromDate))
        .andSmaller("e.updated_at", "toDate", DateParserUtils.parseTo(toDate));

    return pagingJdbcExecutor.query(
        builder.getSql().toString(),
        builder.getParams(),
        pageable,
        ROW_MAPPER
    );
  }
}
