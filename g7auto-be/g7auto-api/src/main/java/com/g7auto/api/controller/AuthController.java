package com.g7auto.api.controller;

import com.g7auto.application.dto.request.LoginRequest;
import com.g7auto.application.dto.request.RefreshTokenRequest;
import com.g7auto.application.dto.response.AccountResponse;
import com.g7auto.application.dto.response.AuthResponse;
import com.g7auto.application.service.AuthService;
import com.g7auto.core.constant.codes.SuccessCode;
import com.g7auto.core.response.ApiResponse;
import com.g7auto.domain.entity.Account;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

  private final AuthService authService;

  @PostMapping("/login")
  public ResponseEntity<ApiResponse<AuthResponse>> login(
      @RequestBody LoginRequest request) {
    return ResponseEntity.ok(
        ApiResponse.ok(SuccessCode.G7_AUTO_00008, authService.login(request)));
  }

  @PostMapping("/refresh")
  public ResponseEntity<ApiResponse<AuthResponse>> refresh(
      @RequestBody RefreshTokenRequest request) {
    return ResponseEntity.ok(ApiResponse.ok(authService.refresh(request)));
  }

  @GetMapping("/me")
  public ResponseEntity<ApiResponse<AccountResponse>> me(
      @AuthenticationPrincipal Account account) {
    return ResponseEntity.ok(ApiResponse.ok(authService.getProfile(account)));
  }

  @PostMapping("/logout")
  public ResponseEntity<ApiResponse<Void>> logout() {
    return ResponseEntity.ok(ApiResponse.ok(null));
  }

  @PostMapping("/init-superadmin")
  public ResponseEntity<ApiResponse<AccountResponse>> initSuperAdmin() {
    return ResponseEntity.ok(ApiResponse.ok(authService.initSuperAdmin()));
  }
}
