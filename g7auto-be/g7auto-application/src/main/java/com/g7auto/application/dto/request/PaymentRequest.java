package com.g7auto.application.dto.request;

import com.g7auto.core.constant.codes.ValidationErrorCode;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PaymentRequest {

  @Schema(description = "ID Hợp đồng")
  @NotNull(message = ValidationErrorCode.G7_AUTO_00800)
  Long contractId;

  @Schema(description = "Số tiền thanh toán")
  @DecimalMin(value = "0", inclusive = false, message = ValidationErrorCode.G7_AUTO_00850)
  BigDecimal amount;

  @Schema(description = "Thời điểm thực hiện thanh toán")
  @NotNull(message = ValidationErrorCode.G7_AUTO_00852)
  LocalDateTime paymentTime;

  @Schema(description = "Hình thức thanh toán")
  @NotBlank(message = ValidationErrorCode.G7_AUTO_00800)
  String method;

  @Schema(description = "ID Nhân viên xác nhận")
  Long collectorId;

  @Schema(description = "Mã giao dịch ngân hàng")
  String transactionCode;

  @Schema(description = "Ghi chú")
  String notes;
}
