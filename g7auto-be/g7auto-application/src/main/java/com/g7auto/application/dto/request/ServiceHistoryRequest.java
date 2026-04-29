package com.g7auto.application.dto.request;

import com.g7auto.core.constant.codes.ValidationErrorCode;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ServiceHistoryRequest {

  @Schema(description = "ID Khách hàng")
  @NotNull(message = ValidationErrorCode.G7_AUTO_00800)
  Long customerId;

  @Schema(description = "ID Nhân viên thực hiện")
  Long employeeId;

  @Schema(description = "Thời điểm tương tác")
  @NotNull(message = ValidationErrorCode.G7_AUTO_00800)
  LocalDateTime serviceDate;

  @Schema(description = "Hình thức (CALL, EMAIL...)")
  @NotBlank(message = ValidationErrorCode.G7_AUTO_00800)
  String contactType;

  @Schema(description = "Nội dung cuộc trao đổi")
  String content;

  @Schema(description = "Kết quả tương tác")
  String result;

  @Schema(description = "Ngày hẹn nhắc lại")
  LocalDateTime nextReminderDate;
}
