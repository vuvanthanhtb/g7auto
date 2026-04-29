package com.g7auto.application.dto.request;

import com.g7auto.core.constant.codes.ValidationErrorCode;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.LocalDate;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class DepositRequest {

  @Schema(description = "ID Báo giá")
  Long quotationId;

  @Schema(description = "ID Khách hàng")
  @NotNull(message = ValidationErrorCode.G7_AUTO_00800)
  Long customerId;

  @Schema(description = "ID Xe")
  @NotNull(message = ValidationErrorCode.G7_AUTO_00800)
  Long carId;

  @Schema(description = "ID Nhân viên thu cọc")
  Long employeeId;

  @Schema(description = "Số tiền đặt cọc")
  @DecimalMin(value = "0", inclusive = false, message = ValidationErrorCode.G7_AUTO_00850)
  BigDecimal amount;

  @Schema(description = "Ngày đặt cọc")
  @NotNull(message = ValidationErrorCode.G7_AUTO_00800)
  LocalDate depositDate;

  @Schema(description = "Ngày hết hạn giữ xe")
  LocalDate expiryDate;

  @Schema(description = "Phương thức thanh toán cọc")
  @NotBlank(message = ValidationErrorCode.G7_AUTO_00800)
  String depositPaymentMethod;

  @Schema(description = "Ghi chú")
  String notes;
}
