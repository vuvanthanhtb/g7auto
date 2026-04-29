package com.g7auto.infrastructure.persistence.query;

import com.g7auto.core.sql.DynamicSqlBuilder;
import com.g7auto.core.sql.PagingJdbcExecutor;
import com.g7auto.core.utils.DateParserUtils;
import com.g7auto.domain.entity.Customer;
import com.g7auto.domain.entity.Employee;
import com.g7auto.domain.entity.ServiceHistory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class ServiceHistoryQueryRepository {

  private static final String BASE_SQL = """
      SELECT sh.id,
             sh.customer_id, c.full_name AS customer_name,
             sh.employee_id, e.full_name AS employee_name,
             sh.service_date, sh.contact_type, sh.content, sh.result,
             sh.next_reminder_date,
             sh.created_at, sh.updated_at,
             COALESCE(sh.created_by, '') AS created_by,
             COALESCE(sh.updated_by, '') AS updated_by
      FROM service_histories sh
      LEFT JOIN customers c ON sh.customer_id = c.id
      LEFT JOIN employees e ON sh.employee_id = e.id
      WHERE 1=1
      """;

  private static final RowMapper<ServiceHistory> ROW_MAPPER = (rs, rowNum) -> {
    ServiceHistory sh = new ServiceHistory();
    sh.setId(rs.getLong("id"));

    long customerId = rs.getLong("customer_id");
    if (!rs.wasNull()) {
      Customer customer = new Customer();
      customer.setId(customerId);
      customer.setFullName(rs.getString("customer_name"));
      sh.setCustomer(customer);
    }

    long empId = rs.getLong("employee_id");
    if (!rs.wasNull()) {
      Employee employee = new Employee();
      employee.setId(empId);
      employee.setFullName(rs.getString("employee_name"));
      sh.setEmployee(employee);
    }

    sh.setServiceDate(rs.getTimestamp("service_date") != null
        ? rs.getTimestamp("service_date").toLocalDateTime() : null);
    sh.setContactType(rs.getString("contact_type"));
    sh.setContent(rs.getString("content"));
    sh.setResult(rs.getString("result"));
    sh.setNextReminderDate(rs.getTimestamp("next_reminder_date") != null
        ? rs.getTimestamp("next_reminder_date").toLocalDateTime() : null);
    sh.setCreatedAt(rs.getTimestamp("created_at") != null
        ? rs.getTimestamp("created_at").toLocalDateTime() : null);
    sh.setUpdatedAt(rs.getTimestamp("updated_at") != null
        ? rs.getTimestamp("updated_at").toLocalDateTime() : null);
    sh.setCreatedBy(rs.getString("created_by"));
    sh.setUpdatedBy(rs.getString("updated_by"));
    return sh;
  };

  private final PagingJdbcExecutor pagingJdbcExecutor;

  public Page<ServiceHistory> search(Long customerId, String fromDate, String toDate,
      Pageable pageable) {
    DynamicSqlBuilder builder = new DynamicSqlBuilder(BASE_SQL);
    builder
        .andEqual("sh.customer_id", "customerId", customerId)
        .andGreaterOrEqual("sh.updated_at", "fromDate", DateParserUtils.parseFrom(fromDate))
        .andSmaller("sh.updated_at", "toDate", DateParserUtils.parseTo(toDate));

    return pagingJdbcExecutor.query(
        builder.getSql().toString(),
        builder.getParams(),
        pageable,
        ROW_MAPPER
    );
  }
}
