package com.g7auto.application.dto.response;

import java.math.BigDecimal;

public record CarModelResponse(
    Long id,
    String name,
    String manufacturer,
    String series,
    String year,
    String color,
    String carType,
    String engine,
    String transmission,
    BigDecimal listedPrice,
    String description,
    String status,
    String createdAt,
    String updatedAt
) {

}
