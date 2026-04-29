package com.g7auto.application.dto.request;

import com.g7auto.core.constant.codes.ValidationErrorCode;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.LocalDate;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ContractRequest {

  @Schema(description = "ID Khách hàng")
  @NotNull(message = ValidationErrorCode.G7_AUTO_00800)
  Long customerId;

  @Schema(description = "ID Xe")
  @NotNull(message = ValidationErrorCode.G7_AUTO_00800)
  Long carId;

  @Schema(description = "ID Nhân viên Sale phụ trách")
  Long employeeId;

  @Schema(description = "ID Phiếu đặt cọc")
  Long depositId;

  @Schema(description = "Ngày ký hợp đồng")
  @NotNull(message = ValidationErrorCode.G7_AUTO_00800)
  LocalDate signDate;

  @Schema(description = "Ngày dự kiến giao xe")
  LocalDate expectedDeliveryDate;

  @Schema(description = "Tổng giá trị hợp đồng")
  @DecimalMin(value = "0", inclusive = false, message = ValidationErrorCode.G7_AUTO_00850)
  BigDecimal contractValue;

  @Schema(description = "Ghi chú")
  String notes;
}
