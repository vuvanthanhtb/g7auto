package com.g7auto.infrastructure.persistence.query;

import com.g7auto.core.entity.ContractStatus;
import com.g7auto.core.sql.DynamicSqlBuilder;
import com.g7auto.core.sql.PagingJdbcExecutor;
import com.g7auto.core.utils.DateParserUtils;
import com.g7auto.domain.entity.Car;
import com.g7auto.domain.entity.Contract;
import com.g7auto.domain.entity.Customer;
import com.g7auto.domain.entity.Employee;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class ContractQueryRepository {

  private static final String BASE_SQL = """
      SELECT c.id, c.contract_number,
             c.customer_id, cu.full_name AS customer_name,
             c.car_id, ca.chassis_number AS car_chassis_number,
             c.employee_id, e.full_name AS employee_name,
             c.deposit_id, c.sign_date, c.expected_delivery_date, c.actual_delivery_date,
             c.contract_value, c.paid_amount, c.remaining_amount, c.status, c.notes,
             c.created_at, c.updated_at, c.created_by, c.updated_by
      FROM contracts c
      LEFT JOIN customers cu ON c.customer_id = cu.id
      LEFT JOIN cars ca ON c.car_id = ca.id
      LEFT JOIN employees e ON c.employee_id = e.id
      WHERE 1=1
      """;

  private static final RowMapper<Contract> ROW_MAPPER = (rs, rowNum) -> {
    Contract c = new Contract();
    c.setId(rs.getLong("id"));
    c.setContractNumber(rs.getString("contract_number"));

    long customerId = rs.getLong("customer_id");
    if (!rs.wasNull()) {
      Customer customer = new Customer();
      customer.setId(customerId);
      customer.setFullName(rs.getString("customer_name"));
      c.setCustomer(customer);
    }

    long carId = rs.getLong("car_id");
    if (!rs.wasNull()) {
      Car car = new Car();
      car.setId(carId);
      car.setChassisNumber(rs.getString("car_chassis_number"));
      c.setCar(car);
    }

    long empId = rs.getLong("employee_id");
    if (!rs.wasNull()) {
      Employee employee = new Employee();
      employee.setId(empId);
      employee.setFullName(rs.getString("employee_name"));
      c.setEmployee(employee);
    }

    long depositId = rs.getLong("deposit_id");
    if (!rs.wasNull()) {
      com.g7auto.domain.entity.Deposit deposit = new com.g7auto.domain.entity.Deposit();
      deposit.setId(depositId);
      c.setDeposit(deposit);
    }

    c.setSignDate(
        rs.getDate("sign_date") != null ? rs.getDate("sign_date").toLocalDate()
            : null);
    c.setExpectedDeliveryDate(
        rs.getDate("expected_delivery_date") != null ? rs.getDate(
            "expected_delivery_date").toLocalDate() : null);
    c.setActualDeliveryDate(
        rs.getDate("actual_delivery_date") != null ? rs.getDate(
            "actual_delivery_date").toLocalDate() : null);
    c.setContractValue(rs.getBigDecimal("contract_value"));
    c.setPaidAmount(rs.getBigDecimal("paid_amount"));
    c.setRemainingAmount(rs.getBigDecimal("remaining_amount"));
    String status = rs.getString("status");
    if (status != null) {
      c.setStatus(ContractStatus.valueOf(status));
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

  public Page<Contract> search(String status, Long customerId, Long carId,
      String fromDate, String toDate, Pageable pageable) {
    DynamicSqlBuilder builder = new DynamicSqlBuilder(BASE_SQL);
    builder.andEqual("c.status", "status", status)
        .andEqual("c.customer_id", "customerId", customerId)
        .andEqual("c.car_id", "carId", carId)
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
