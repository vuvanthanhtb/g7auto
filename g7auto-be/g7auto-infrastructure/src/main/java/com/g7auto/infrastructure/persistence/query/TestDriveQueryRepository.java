package com.g7auto.infrastructure.persistence.query;

import com.g7auto.core.entity.TestDriveStatus;
import com.g7auto.core.sql.DynamicSqlBuilder;
import com.g7auto.core.sql.PagingJdbcExecutor;
import com.g7auto.core.utils.DateParserUtils;
import com.g7auto.domain.entity.Car;
import com.g7auto.domain.entity.Customer;
import com.g7auto.domain.entity.Employee;
import com.g7auto.domain.entity.Showroom;
import com.g7auto.domain.entity.TestDrive;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class TestDriveQueryRepository {

  private static final String BASE_SQL = """
      SELECT td.id,
             td.customer_id, cu.full_name AS customer_name,
             td.car_id, ca.chassis_number AS car_chassis_number,
             td.employee_id, e.full_name AS employee_name,
             td.showroom_id, s.name AS showroom_name,
             td.start_time, td.end_time, td.status, td.notes,
             td.created_at, td.updated_at, td.created_by, td.updated_by
      FROM test_drives td
      LEFT JOIN customers cu ON td.customer_id = cu.id
      LEFT JOIN cars ca ON td.car_id = ca.id
      LEFT JOIN employees e ON td.employee_id = e.id
      LEFT JOIN showrooms s ON td.showroom_id = s.id
      WHERE 1=1
      """;

  private static final RowMapper<TestDrive> ROW_MAPPER = (rs, rowNum) -> {
    TestDrive td = new TestDrive();
    td.setId(rs.getLong("id"));

    long customerId = rs.getLong("customer_id");
    if (!rs.wasNull()) {
      Customer customer = new Customer();
      customer.setId(customerId);
      customer.setFullName(rs.getString("customer_name"));
      td.setCustomer(customer);
    }

    long carId = rs.getLong("car_id");
    if (!rs.wasNull()) {
      Car car = new Car();
      car.setId(carId);
      car.setChassisNumber(rs.getString("car_chassis_number"));
      td.setCar(car);
    }

    long empId = rs.getLong("employee_id");
    if (!rs.wasNull()) {
      Employee employee = new Employee();
      employee.setId(empId);
      employee.setFullName(rs.getString("employee_name"));
      td.setEmployee(employee);
    }

    long showroomId = rs.getLong("showroom_id");
    if (!rs.wasNull()) {
      Showroom showroom = new Showroom();
      showroom.setId(showroomId);
      showroom.setName(rs.getString("showroom_name"));
      td.setShowroom(showroom);
    }

    td.setStartTime(
        rs.getTimestamp("start_time") != null ? rs.getTimestamp("start_time")
            .toLocalDateTime() : null);
    td.setEndTime(
        rs.getTimestamp("end_time") != null ? rs.getTimestamp("end_time")
            .toLocalDateTime() : null);
    String status = rs.getString("status");
    if (status != null) {
      td.setStatus(TestDriveStatus.valueOf(status));
    }
    td.setNotes(rs.getString("notes"));
    td.setCreatedAt(
        rs.getTimestamp("created_at") != null ? rs.getTimestamp("created_at")
            .toLocalDateTime() : null);
    td.setUpdatedAt(
        rs.getTimestamp("updated_at") != null ? rs.getTimestamp("updated_at")
            .toLocalDateTime() : null);
    td.setCreatedBy(rs.getString("created_by"));
    td.setUpdatedBy(rs.getString("updated_by"));
    return td;
  };

  private final PagingJdbcExecutor pagingJdbcExecutor;

  public Page<TestDrive> search(String status, Long customerId, Long showroomId,
      String fromDate, String toDate, Pageable pageable) {
    DynamicSqlBuilder builder = new DynamicSqlBuilder(BASE_SQL);
    builder.andEqual("td.status", "status", status)
        .andEqual("td.customer_id", "customerId", customerId)
        .andEqual("td.showroom_id", "showroomId", showroomId)
        .andGreaterOrEqual("td.updated_at", "fromDate", DateParserUtils.parseFrom(fromDate))
        .andSmaller("td.updated_at", "toDate", DateParserUtils.parseTo(toDate));

    return pagingJdbcExecutor.query(
        builder.getSql().toString(),
        builder.getParams(),
        pageable,
        ROW_MAPPER
    );
  }
}
