package com.g7auto.infrastructure.persistence.query;

import com.g7auto.core.entity.QuotationStatus;
import com.g7auto.core.sql.DynamicSqlBuilder;
import com.g7auto.core.sql.PagingJdbcExecutor;
import com.g7auto.core.utils.DateParserUtils;
import com.g7auto.domain.entity.Car;
import com.g7auto.domain.entity.Customer;
import com.g7auto.domain.entity.Employee;
import com.g7auto.domain.entity.Quotation;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class QuotationQueryRepository {

  private static final String BASE_SQL = """
      SELECT q.id,
             q.customer_id,
             cu.full_name AS customer_name,
             q.car_id,
             ca.chassis_number AS car_chassis_number,
             q.employee_id,
             e.full_name AS employee_name,
             q.car_price,
             q.accessories,
             q.promotion,
             q.other_costs,
             q.total_amount,
             q.created_date,
             q.status,
             q.notes,
             q.created_at,
             q.updated_at,
             q.created_by,
             q.updated_by
      FROM quotations q
      LEFT JOIN customers cu ON q.customer_id = cu.id
      LEFT JOIN cars ca ON q.car_id = ca.id
      LEFT JOIN employees e ON q.employee_id = e.id
      WHERE 1=1
      """;

  private static final RowMapper<Quotation> ROW_MAPPER = (rs, rowNum) -> {
    Quotation q = new Quotation();
    q.setId(rs.getLong("id"));

    long customerId = rs.getLong("customer_id");
    if (!rs.wasNull()) {
      Customer customer = new Customer();
      customer.setId(customerId);
      customer.setFullName(rs.getString("customer_name"));
      q.setCustomer(customer);
    }

    long carId = rs.getLong("car_id");
    if (!rs.wasNull()) {
      Car car = new Car();
      car.setId(carId);
      car.setChassisNumber(rs.getString("car_chassis_number"));
      q.setCar(car);
    }

    long empId = rs.getLong("employee_id");
    if (!rs.wasNull()) {
      Employee employee = new Employee();
      employee.setId(empId);
      employee.setFullName(rs.getString("employee_name"));
      q.setEmployee(employee);
    }

    q.setCarPrice(rs.getBigDecimal("car_price"));
    q.setAccessories(rs.getBigDecimal("accessories"));
    q.setPromotion(rs.getBigDecimal("promotion"));
    q.setOtherCosts(rs.getBigDecimal("other_costs"));
    q.setTotalAmount(rs.getBigDecimal("total_amount"));
    q.setCreatedDate(rs.getTimestamp("created_date") != null ? rs.getTimestamp(
        "created_date").toLocalDateTime() : null);
    String status = rs.getString("status");
    if (status != null) {
      q.setStatus(QuotationStatus.valueOf(status));
    }
    q.setNotes(rs.getString("notes"));
    q.setCreatedAt(
        rs.getTimestamp("created_at") != null ? rs.getTimestamp("created_at")
            .toLocalDateTime() : null);
    q.setUpdatedAt(
        rs.getTimestamp("updated_at") != null ? rs.getTimestamp("updated_at")
            .toLocalDateTime() : null);
    q.setCreatedBy(rs.getString("created_by"));
    q.setUpdatedBy(rs.getString("updated_by"));
    return q;
  };

  private final PagingJdbcExecutor pagingJdbcExecutor;

  public Page<Quotation> search(String status, Long customerId,
      String fromDate, String toDate, Pageable pageable) {
    DynamicSqlBuilder builder = new DynamicSqlBuilder(BASE_SQL);
    builder.andEqual("q.status", "status", status)
        .andEqual("q.customer_id", "customerId", customerId)
        .andGreaterOrEqual("q.updated_at", "fromDate", DateParserUtils.parseFrom(fromDate))
        .andSmaller("q.updated_at", "toDate", DateParserUtils.parseTo(toDate));

    return pagingJdbcExecutor.query(
        builder.getSql().toString(),
        builder.getParams(),
        pageable,
        ROW_MAPPER
    );
  }
}
