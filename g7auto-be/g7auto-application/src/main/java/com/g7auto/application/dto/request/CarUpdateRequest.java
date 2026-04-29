package com.g7auto.application.dto.request;

import com.g7auto.core.constant.codes.ValidationErrorCode;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.DecimalMin;
import java.math.BigDecimal;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CarUpdateRequest {

  @Schema(description = "Biển số xe")
  String licensePlate;

  @Schema(description = "ID Showroom hiện tại")
  Long showroomId;

  @Schema(description = "Giá bán thực tế")
  @DecimalMin(value = "0", inclusive = false, message = ValidationErrorCode.G7_AUTO_00850)
  BigDecimal salePrice;

  @Schema(description = "Trạng thái xe")
  String status;

  @Schema(description = "Ghi chú")
  String notes;
}
