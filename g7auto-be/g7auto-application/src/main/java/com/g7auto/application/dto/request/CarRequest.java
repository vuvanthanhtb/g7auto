package com.g7auto.application.dto.request;

import com.g7auto.core.constant.codes.ValidationErrorCode;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CarRequest {

  @Schema(description = "Số khung (VIN)")
  @NotBlank(message = ValidationErrorCode.G7_AUTO_00814)
  String chassisNumber;

  @Schema(description = "Số máy")
  @NotBlank(message = ValidationErrorCode.G7_AUTO_00816)
  String engineNumber;

  @Schema(description = "Biển số xe (nếu có)")
  String licensePlate;

  @Schema(description = "ID mẫu xe")
  @NotNull(message = ValidationErrorCode.G7_AUTO_00800)
  Long carModelId;

  @Schema(description = "ID Showroom đang lưu kho")
  @NotNull(message = ValidationErrorCode.G7_AUTO_00800)
  Long showroomId;

  @Schema(description = "Giá bán thực tế")
  @DecimalMin(value = "0", inclusive = false, message = ValidationErrorCode.G7_AUTO_00850)
  BigDecimal salePrice;

  @Schema(description = "Ghi chú")
  String notes;
}
