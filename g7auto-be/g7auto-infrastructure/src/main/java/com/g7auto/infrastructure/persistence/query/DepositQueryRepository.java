package com.g7auto.infrastructure.persistence.query;

import com.g7auto.core.entity.DepositPaymentMethod;
import com.g7auto.core.entity.DepositStatus;
import com.g7auto.core.sql.DynamicSqlBuilder;
import com.g7auto.core.sql.PagingJdbcExecutor;
import com.g7auto.core.utils.DateParserUtils;
import com.g7auto.domain.entity.Car;
import com.g7auto.domain.entity.Customer;
import com.g7auto.domain.entity.Deposit;
import com.g7auto.domain.entity.Employee;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class DepositQueryRepository {

  private static final String BASE_SQL = """
      SELECT d.id,
             d.customer_id, cu.full_name AS customer_name,
             d.car_id, ca.chassis_number AS car_chassis_number,
             d.employee_id, e.full_name AS employee_name,
             d.quotation_id, d.amount, d.deposit_date, d.expiry_date,
             d.deposit_payment_method, d.status, d.notes,
             d.created_at, d.updated_at, d.created_by, d.updated_by
      FROM deposits d
      LEFT JOIN customers cu ON d.customer_id = cu.id
      LEFT JOIN cars ca ON d.car_id = ca.id
      LEFT JOIN employees e ON d.employee_id = e.id
      WHERE 1=1
      """;

  private static final RowMapper<Deposit> ROW_MAPPER = (rs, rowNum) -> {
    Deposit d = new Deposit();
    d.setId(rs.getLong("id"));

    long customerId = rs.getLong("customer_id");
    if (!rs.wasNull()) {
      Customer customer = new Customer();
      customer.setId(customerId);
      customer.setFullName(rs.getString("customer_name"));
      d.setCustomer(customer);
    }

    long carId = rs.getLong("car_id");
    if (!rs.wasNull()) {
      Car car = new Car();
      car.setId(carId);
      car.setChassisNumber(rs.getString("car_chassis_number"));
      d.setCar(car);
    }

    long empId = rs.getLong("employee_id");
    if (!rs.wasNull()) {
      Employee employee = new Employee();
      employee.setId(empId);
      employee.setFullName(rs.getString("employee_name"));
      d.setEmployee(employee);
    }

    d.setAmount(rs.getBigDecimal("amount"));
    d.setDepositDate(
        rs.getDate("deposit_date") != null ? rs.getDate("deposit_date")
            .toLocalDate() : null);
    d.setExpiryDate(
        rs.getDate("expiry_date") != null ? rs.getDate("expiry_date")
            .toLocalDate() : null);
    String method = rs.getString("deposit_payment_method");
    if (method != null) {
      d.setDepositPaymentMethod(DepositPaymentMethod.valueOf(method));
    }
    String status = rs.getString("status");
    if (status != null) {
      d.setStatus(DepositStatus.valueOf(status));
    }
    d.setNotes(rs.getString("notes"));
    d.setCreatedAt(
        rs.getTimestamp("created_at") != null ? rs.getTimestamp("created_at")
            .toLocalDateTime() : null);
    d.setUpdatedAt(
        rs.getTimestamp("updated_at") != null ? rs.getTimestamp("updated_at")
            .toLocalDateTime() : null);
    d.setCreatedBy(rs.getString("created_by"));
    d.setUpdatedBy(rs.getString("updated_by"));
    return d;
  };

  private final PagingJdbcExecutor pagingJdbcExecutor;

  public Page<Deposit> search(String status, Long customerId,
      String fromDate, String toDate, Pageable pageable) {
    DynamicSqlBuilder builder = new DynamicSqlBuilder(BASE_SQL);
    builder.andEqual("d.status", "status", status)
        .andEqual("d.customer_id", "customerId", customerId)
        .andGreaterOrEqual("d.updated_at", "fromDate", DateParserUtils.parseFrom(fromDate))
        .andSmaller("d.updated_at", "toDate", DateParserUtils.parseTo(toDate));

    return pagingJdbcExecutor.query(
        builder.getSql().toString(),
        builder.getParams(),
        pageable,
        ROW_MAPPER
    );
  }
}
