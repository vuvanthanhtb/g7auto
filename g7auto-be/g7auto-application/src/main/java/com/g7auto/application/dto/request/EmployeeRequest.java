package com.g7auto.application.dto.request;

import com.g7auto.core.constant.codes.ValidationErrorCode;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class EmployeeRequest {

  @Schema(description = "Họ và tên nhân viên")
  @NotBlank(message = ValidationErrorCode.G7_AUTO_00800)
  String fullName;

  @Schema(description = "Số điện thoại cá nhân")
  @NotBlank(message = ValidationErrorCode.G7_AUTO_00831)
  String phone;

  @Schema(description = "Email cá nhân")
  @Email(message = ValidationErrorCode.G7_AUTO_00833)
  String email;

  @Schema(description = "Địa chỉ thường trú")
  String address;

  @Schema(description = "Ngày sinh")
  LocalDate birthDate;

  @Schema(description = "Giới tính")
  String gender;

  @Schema(description = "Số CCCD/CMND")
  @NotBlank(message = ValidationErrorCode.G7_AUTO_00832)
  String nationalId;

  @Schema(description = "Ngày vào làm")
  LocalDate joinDate;

  @Schema(description = "ID Showroom nơi nhân viên làm việc")
  @NotNull(message = ValidationErrorCode.G7_AUTO_00800)
  Long showroomId;

  @Schema(description = "ID Tài khoản hệ thống tương ứng")
  Long accountId;
}
