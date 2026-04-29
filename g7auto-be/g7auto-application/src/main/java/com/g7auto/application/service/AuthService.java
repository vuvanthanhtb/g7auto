package com.g7auto.application.service;

import com.g7auto.application.dto.request.LoginRequest;
import com.g7auto.application.dto.request.RefreshTokenRequest;
import com.g7auto.application.dto.response.AccountResponse;
import com.g7auto.application.dto.response.AuthResponse;
import com.g7auto.domain.entity.Account;

public interface AuthService {

  AuthResponse login(LoginRequest request);

  AuthResponse refresh(RefreshTokenRequest request);

  AccountResponse getProfile(Account account);

  AccountResponse initSuperAdmin();
}
