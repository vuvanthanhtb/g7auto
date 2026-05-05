package com.g7auto.infrastructure.persistence.query;

import com.g7auto.core.entity.TransferStatus;
import com.g7auto.core.sql.DynamicSqlBuilder;
import com.g7auto.core.sql.PagingJdbcExecutor;
import com.g7auto.domain.entity.Car;
import com.g7auto.domain.entity.CarTransfer;
import com.g7auto.domain.entity.Showroom;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class CarTransferQueryRepository {

  private static final String BASE_SQL = """
      SELECT ct.id, ct.car_id, c.chassis_number AS car_chassis_number,
             ct.from_showroom_id, fs.name AS from_showroom_name,
             ct.to_showroom_id, ts.name AS to_showroom_name,
             ct.created_by_employee_id, ct.transfer_date, ct.expected_receive_date,
             ct.actual_receive_date, ct.status, ct.reason, ct.notes,
             ct.created_at, ct.updated_at, ct.created_by, ct.updated_by
      FROM car_transfers ct
      LEFT JOIN cars c ON ct.car_id = c.id
      LEFT JOIN showrooms fs ON ct.from_showroom_id = fs.id
      LEFT JOIN showrooms ts ON ct.to_showroom_id = ts.id
      WHERE 1=1
      """;

  private static final RowMapper<CarTransfer> ROW_MAPPER = (rs, rowNum) -> {
    CarTransfer ct = new CarTransfer();
    ct.setId(rs.getLong("id"));

    long carId = rs.getLong("car_id");
    if (!rs.wasNull()) {
      Car car = new Car();
      car.setId(carId);
      car.setChassisNumber(rs.getString("car_chassis_number"));
      ct.setCar(car);
    }

    long fromId = rs.getLong("from_showroom_id");
    if (!rs.wasNull()) {
      Showroom from = new Showroom();
      from.setId(fromId);
      from.setName(rs.getString("from_showroom_name"));
      ct.setFromShowroom(from);
    }

    long toId = rs.getLong("to_showroom_id");
    if (!rs.wasNull()) {
      Showroom to = new Showroom();
      to.setId(toId);
      to.setName(rs.getString("to_showroom_name"));
      ct.setToShowroom(to);
    }

    long empId = rs.getLong("created_by_employee_id");
    if (!rs.wasNull()) {
      ct.setCreatedByEmployeeId(empId);
    }

    ct.setTransferDate(
        rs.getDate("transfer_date") != null ? rs.getDate("transfer_date")
            .toLocalDate() : null);
    ct.setExpectedReceiveDate(
        rs.getDate("expected_receive_date") != null ? rs.getDate(
            "expected_receive_date").toLocalDate() : null);
    ct.setActualReceiveDate(
        rs.getDate("actual_receive_date") != null ? rs.getDate(
            "actual_receive_date").toLocalDate() : null);
    String status = rs.getString("status");
    if (status != null) {
      ct.setStatus(TransferStatus.valueOf(status));
    }
    ct.setReason(rs.getString("reason"));
    ct.setNotes(rs.getString("notes"));
    ct.setCreatedAt(
        rs.getTimestamp("created_at") != null ? rs.getTimestamp("created_at")
            .toLocalDateTime() : null);
    ct.setUpdatedAt(
        rs.getTimestamp("updated_at") != null ? rs.getTimestamp("updated_at")
            .toLocalDateTime() : null);
    ct.setCreatedBy(rs.getString("created_by"));
    ct.setUpdatedBy(rs.getString("updated_by"));
    return ct;
  };

  private final PagingJdbcExecutor pagingJdbcExecutor;

  public Page<CarTransfer> search(String status, Long showroomId,
      String fromDate, String toDate, Pageable pageable) {
    DynamicSqlBuilder builder = new DynamicSqlBuilder(BASE_SQL);
    builder.andEqual("ct.status", "status", status);
    if (showroomId != null) {
      builder.andRaw(
          "(ct.from_showroom_id = :showroomId OR ct.to_showroom_id = :showroomId)",
          Map.of("showroomId", showroomId));
    }

    return pagingJdbcExecutor.query(
        builder.getSql().toString(),
        builder.getParams(),
        pageable,
        ROW_MAPPER
    );
  }
}
