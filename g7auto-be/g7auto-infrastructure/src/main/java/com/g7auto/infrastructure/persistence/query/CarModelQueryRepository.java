package com.g7auto.infrastructure.persistence.query;

import com.g7auto.core.entity.CarModelStatus;
import com.g7auto.core.sql.DynamicSqlBuilder;
import com.g7auto.core.sql.PagingJdbcExecutor;
import com.g7auto.core.utils.DateParserUtils;
import com.g7auto.domain.entity.CarModel;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class CarModelQueryRepository {

  private static final String BASE_SQL = """
      SELECT m.id,
             m.name,
             m.manufacturer,
             m.series,
             m.year,
             m.color,
             m.car_type,
             m.engine,
             m.transmission,
             m.listed_price,
             m.description,
             m.status,
             m.created_at,
             m.updated_at,
             m.created_by,
             m.updated_by
      FROM car_models m
      WHERE 1=1
      """;

  private static final RowMapper<CarModel> ROW_MAPPER = (rs, rowNum) -> {
    CarModel m = new CarModel();
    m.setId(rs.getLong("id"));
    m.setName(rs.getString("name"));
    m.setManufacturer(rs.getString("manufacturer"));
    m.setSeries(rs.getString("series"));
    m.setYear(rs.getString("year"));
    m.setColor(rs.getString("color"));
    m.setCarType(rs.getString("car_type"));
    m.setEngine(rs.getString("engine"));
    m.setTransmission(rs.getString("transmission"));
    m.setListedPrice(rs.getBigDecimal("listed_price"));
    m.setDescription(rs.getString("description"));
    String status = rs.getString("status");
    if (status != null) {
      m.setStatus(CarModelStatus.valueOf(status));
    }
    m.setCreatedAt(
        rs.getTimestamp("created_at") != null ? rs.getTimestamp("created_at")
            .toLocalDateTime() : null);
    m.setUpdatedAt(
        rs.getTimestamp("updated_at") != null ? rs.getTimestamp("updated_at")
            .toLocalDateTime() : null);
    m.setCreatedBy(rs.getString("created_by"));
    m.setUpdatedBy(rs.getString("updated_by"));
    return m;
  };

  private final PagingJdbcExecutor pagingJdbcExecutor;

  public Page<CarModel> search(String name, String manufacturer,
      String fromDate, String toDate, Pageable pageable) {
    DynamicSqlBuilder builder = new DynamicSqlBuilder(BASE_SQL);
    builder.andLike("m.name", "name", name, true, true)
        .andLike("m.manufacturer", "manufacturer", manufacturer, true, true)
        .andGreaterOrEqual("m.updated_at", "fromDate", DateParserUtils.parseFrom(fromDate))
        .andSmaller("m.updated_at", "toDate", DateParserUtils.parseTo(toDate));

    return pagingJdbcExecutor.query(
        builder.getSql().toString(),
        builder.getParams(),
        pageable,
        ROW_MAPPER
    );
  }
}
