package com.g7auto.application.dto.request;

import com.g7auto.core.constant.codes.ValidationErrorCode;
import com.g7auto.core.entity.Role;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import java.util.List;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AccountRequest {

  @Schema(description = "Tên đăng nhập")
  @NotBlank(message = ValidationErrorCode.G7_AUTO_00800)
  String username;

  @Schema(description = "Mật khẩu")
  String password;

  @Schema(description = "Email người dùng")
  @Email(message = ValidationErrorCode.G7_AUTO_00833)
  @NotBlank(message = ValidationErrorCode.G7_AUTO_00800)
  String email;

  @Schema(description = "Họ và tên đầy đủ")
  @NotBlank(message = ValidationErrorCode.G7_AUTO_00800)
  String fullName;

  @Schema(description = "Danh sách quyền/vai trò")
  List<Role> roles;

  @Schema(description = "Trạng thái tài khoản")
  String status;
}
