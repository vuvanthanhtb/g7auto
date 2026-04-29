package com.g7auto.application.dto.request;

import com.g7auto.core.constant.codes.ValidationErrorCode;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CarTransferRequest {

  @Schema(description = "ID Xe")
  @NotNull(message = ValidationErrorCode.G7_AUTO_00800)
  Long carId;

  @Schema(description = "ID Showroom xuất")
  @NotNull(message = ValidationErrorCode.G7_AUTO_00800)
  Long fromShowroomId;

  @Schema(description = "ID Showroom nhập")
  @NotNull(message = ValidationErrorCode.G7_AUTO_00800)
  Long toShowroomId;

  @Schema(description = "Ngày dự kiến tới nơi")
  LocalDate expectedReceiveDate;

  @Schema(description = "Lý do điều chuyển")
  @NotBlank(message = ValidationErrorCode.G7_AUTO_00800)
  String reason;

  @Schema(description = "Ghi chú")
  String notes;
}
