package com.g7auto.application.dto.request;

import com.g7auto.core.constant.codes.ValidationErrorCode;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import java.math.BigDecimal;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CarModelRequest {

  @Schema(description = "Tên mẫu xe")
  @NotBlank(message = ValidationErrorCode.G7_AUTO_00811)
  String name;

  @Schema(description = "Hãng sản xuất")
  String manufacturer;

  @Schema(description = "Dòng xe")
  String series;

  @Schema(description = "Đời xe/Năm sản xuất")
  String year;

  @Schema(description = "Màu sắc mẫu")
  String color;

  @Schema(description = "Loại xe (Số sàn, số tự động)")
  String carType;

  @Schema(description = "Thông số động cơ")
  String engine;

  @Schema(description = "Loại hộp số")
  String transmission;

  @Schema(description = "Giá niêm yết của hãng")
  @DecimalMin(value = "0", inclusive = false, message = ValidationErrorCode.G7_AUTO_00850)
  BigDecimal listedPrice;

  @Schema(description = "Mô tả chi tiết tính năng")
  String description;
}
