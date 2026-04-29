package com.g7auto.application.dto.request;

import com.g7auto.core.constant.codes.AuthErrorCode;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RefreshTokenRequest {

  @Schema(description = "Refresh token")
  @NotBlank(message = AuthErrorCode.G7_AUTO_00206)
  String refreshToken;
}
