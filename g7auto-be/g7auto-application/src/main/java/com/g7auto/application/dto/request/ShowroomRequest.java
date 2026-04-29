package com.g7auto.application.dto.request;

import com.g7auto.core.constant.codes.ValidationErrorCode;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ShowroomRequest {

  @Schema(description = "Tên showroom")
  @NotBlank(message = ValidationErrorCode.G7_AUTO_00800)
  String name;

  @Schema(description = "Địa chỉ chi tiết")
  @NotBlank(message = ValidationErrorCode.G7_AUTO_00800)
  String address;

  @Schema(description = "Số điện thoại liên lạc")
  String phone;

  @Schema(description = "Email của showroom")
  @Email(message = ValidationErrorCode.G7_AUTO_00801)
  String email;

  @Schema(description = "Tên người quản lý showroom")
  String manager;
}
