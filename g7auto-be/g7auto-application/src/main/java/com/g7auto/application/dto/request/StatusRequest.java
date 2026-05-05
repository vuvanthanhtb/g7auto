package com.g7auto.application.dto.request;

import com.g7auto.core.constant.codes.AuthErrorCode;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class StatusRequest {

  @Schema(description = "Tài khoản yêu cầu")
  @NotBlank(message = AuthErrorCode.G7_AUTO_00207)
  String username;

  @Schema(description = "Hàng động yêu cầu")
  @NotBlank(message = AuthErrorCode.G7_AUTO_00207)
  String action;
}
