package com.g7auto.application.dto.request;

import com.g7auto.core.constant.codes.ValidationErrorCode;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class QuotationRequest {

  @Schema(description = "ID Khách hàng")
  @NotNull(message = ValidationErrorCode.G7_AUTO_00800)
  Long customerId;

  @Schema(description = "ID Xe")
  @NotNull(message = ValidationErrorCode.G7_AUTO_00800)
  Long carId;

  @Schema(description = "ID Nhân viên lập báo giá")
  Long employeeId;

  @Schema(description = "Giá xe trong báo giá")
  @DecimalMin(value = "0", inclusive = false, message = ValidationErrorCode.G7_AUTO_00850)
  BigDecimal carPrice;

  @Schema(description = "Tổng chi phí phụ kiện")
  BigDecimal accessories;

  @Schema(description = "Giá trị khuyến mãi/giảm giá")
  BigDecimal promotion;

  @Schema(description = "Các chi phí khác")
  BigDecimal otherCosts;

  @Schema(description = "Ghi chú")
  String notes;
}
