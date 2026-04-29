package com.g7auto.application.dto.request;

import com.g7auto.core.constant.codes.ValidationErrorCode;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class TestDriveRequest {

  @Schema(description = "ID Khách hàng")
  @NotNull(message = ValidationErrorCode.G7_AUTO_00830)
  Long customerId;

  @Schema(description = "ID Xe demo")
  @NotNull(message = ValidationErrorCode.G7_AUTO_00800)
  Long carId;

  @Schema(description = "ID Nhân viên sale đi kèm")
  Long employeeId;

  @Schema(description = "ID Showroom thực hiện")
  Long showroomId;

  @Schema(description = "Thời điểm bắt đầu dự kiến")
  @NotNull(message = ValidationErrorCode.G7_AUTO_00891)
  LocalDateTime startTime;

  @Schema(description = "Thời điểm kết thúc dự kiến")
  @NotNull(message = ValidationErrorCode.G7_AUTO_00892)
  LocalDateTime endTime;

  @Schema(description = "Ghi chú/Nhận xét của khách")
  String notes;
}
