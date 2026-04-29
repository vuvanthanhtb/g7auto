package com.g7auto.infrastructure.persistence.query;

import com.g7auto.core.entity.CarStatus;
import com.g7auto.core.sql.DynamicSqlBuilder;
import com.g7auto.core.sql.PagingJdbcExecutor;
import com.g7auto.core.utils.DateParserUtils;
import com.g7auto.domain.entity.Car;
import com.g7auto.domain.entity.CarModel;
import com.g7auto.domain.entity.Showroom;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class CarQueryRepository {

  private static final String BASE_SQL = """
      SELECT c.id, c.chassis_number, c.engine_number, c.license_plate,
             c.status, c.sale_price, c.arrival_date, c.year, c.notes,
             c.car_model_id, cm.name AS car_model_name,
             c.showroom_id, s.name AS showroom_name,
             c.created_at, c.updated_at, c.created_by, c.updated_by
      FROM cars c
      LEFT JOIN car_models cm ON c.car_model_id = cm.id
      LEFT JOIN showrooms s ON c.showroom_id = s.id
      WHERE 1=1
      """;

  private static final RowMapper<Car> ROW_MAPPER = (rs, rowNum) -> {
    Car car = new Car();
    car.setId(rs.getLong("id"));
    car.setChassisNumber(rs.getString("chassis_number"));
    car.setEngineNumber(rs.getString("engine_number"));
    car.setLicensePlate(rs.getString("license_plate"));
    String status = rs.getString("status");
    if (status != null) {
      car.setStatus(CarStatus.valueOf(status));
    }
    car.setSalePrice(rs.getBigDecimal("sale_price"));
    car.setArrivalDate(
        rs.getDate("arrival_date") != null ? rs.getDate("arrival_date")
            .toLocalDate() : null);
    int year = rs.getInt("year");
    if (!rs.wasNull()) {
      car.setYear(year);
    }
    car.setNotes(rs.getString("notes"));

    long carModelId = rs.getLong("car_model_id");
    if (!rs.wasNull()) {
      CarModel carModel = new CarModel();
      carModel.setId(carModelId);
      carModel.setName(rs.getString("car_model_name"));
      car.setCarModel(carModel);
    }

    long showroomId = rs.getLong("showroom_id");
    if (!rs.wasNull()) {
      Showroom showroom = new Showroom();
      showroom.setId(showroomId);
      showroom.setName(rs.getString("showroom_name"));
      car.setShowroom(showroom);
    }

    car.setCreatedAt(
        rs.getTimestamp("created_at") != null ? rs.getTimestamp("created_at")
            .toLocalDateTime() : null);
    car.setUpdatedAt(
        rs.getTimestamp("updated_at") != null ? rs.getTimestamp("updated_at")
            .toLocalDateTime() : null);
    car.setCreatedBy(rs.getString("created_by"));
    car.setUpdatedBy(rs.getString("updated_by"));
    return car;
  };

  private final PagingJdbcExecutor pagingJdbcExecutor;

  public Page<Car> search(String status, Long showroomId, Long carModelId,
      String fromDate, String toDate, Pageable pageable) {
    DynamicSqlBuilder builder = new DynamicSqlBuilder(BASE_SQL);
    builder.andEqual("c.status", "status", status)
        .andEqual("c.showroom_id", "showroomId", showroomId)
        .andEqual("c.car_model_id", "carModelId", carModelId)
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
