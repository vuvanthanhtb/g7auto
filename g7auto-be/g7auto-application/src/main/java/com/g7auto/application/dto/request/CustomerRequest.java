package com.g7auto.application.dto.request;

import com.g7auto.core.constant.codes.ValidationErrorCode;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import java.time.LocalDate;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CustomerRequest {

  @Schema(description = "Họ tên khách hàng")
  @NotBlank(message = ValidationErrorCode.G7_AUTO_00830)
  String fullName;

  @Schema(description = "Số điện thoại")
  @NotBlank(message = ValidationErrorCode.G7_AUTO_00831)
  String phone;

  @Schema(description = "Email khách hàng")
  @Email(message = ValidationErrorCode.G7_AUTO_00833)
  String email;

  @Schema(description = "Địa chỉ liên lạc")
  @NotBlank(message = ValidationErrorCode.G7_AUTO_00834)
  String address;

  @Schema(description = "Ngày sinh")
  LocalDate birthDate;

  @Schema(description = "Số CCCD/CMND")
  String nationalId;

  @Schema(description = "Nguồn khách hàng")
  String sourceType;

  @Schema(description = "Các mẫu xe khách hàng quan tâm")
  String carInterest;

  @Schema(description = "ID Nhân viên Sale phụ trách")
  Long assignedEmployeeId;

  @Schema(description = "Ghi chú")
  String notes;
}
