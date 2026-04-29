package com.g7auto.application.service.impl;

import com.g7auto.application.dto.request.LoginRequest;
import com.g7auto.application.dto.request.RefreshTokenRequest;
import com.g7auto.application.dto.response.AccountResponse;
import com.g7auto.application.dto.response.AuthResponse;
import com.g7auto.application.mapper.AccountMapper;
import com.g7auto.application.service.AuthService;
import com.g7auto.core.constant.codes.AuthErrorCode;
import com.g7auto.core.entity.AccountStatus;
import com.g7auto.core.entity.Role;
import com.g7auto.core.exception.BadRequestException;
import com.g7auto.core.exception.ConflictException;
import com.g7auto.core.exception.NotFoundException;
import com.g7auto.domain.entity.Account;
import com.g7auto.infrastructure.persistence.AccountRepository;
import com.g7auto.infrastructure.security.JwtService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

  private final AccountRepository accountRepository;
  private final AccountMapper accountMapper;
  private final PasswordEncoder passwordEncoder;
  private final JwtService jwtService;
  private final AuthenticationManager authenticationManager;

  @Override
  public AuthResponse login(LoginRequest request) {
    try {
      authenticationManager.authenticate(
          new UsernamePasswordAuthenticationToken(request.getUsername(),
              request.getPassword())
      );
    } catch (BadCredentialsException e) {
      log.error("Tên đăng nhập hoặc mật khẩu không đúng: {}", request.getUsername());
      throw new BadRequestException(AuthErrorCode.G7_AUTO_00200);
    }

    Account account = accountRepository.findByUsername(request.getUsername())
        .orElseThrow(() -> {
          log.error("Không tìm thấy tài khoản với tên đăng nhập: {}", request.getUsername());
          return new NotFoundException(AuthErrorCode.G7_AUTO_00200);
        });

    if (account.getStatus() == AccountStatus.LOCKED) {
      log.error("Tài khoản đã bị khóa: {}", request.getUsername());
      throw new BadRequestException(AuthErrorCode.G7_AUTO_00201);
    }

    if (account.getStatus() == AccountStatus.INACTIVE) {
      log.error("Tài khoản chưa kích hoạt hoặc đã ngưng hoạt động: {}", request.getUsername());
      throw new BadRequestException(AuthErrorCode.G7_AUTO_00205);
    }

    String accessToken = jwtService.generateToken(account);
    String refreshToken = jwtService.generateRefreshToken(account);
    return new AuthResponse(accessToken, refreshToken);
  }

  @Override
  public AuthResponse refresh(RefreshTokenRequest request) {
    String username = jwtService.extractUsername(request.getRefreshToken());
    if (username == null) {
      log.error("Refresh token không hợp lệ hoặc đã hết hạn");
      throw new BadRequestException(AuthErrorCode.G7_AUTO_00206);
    }

    Account account = accountRepository.findByUsername(username)
        .orElseThrow(() -> {
          log.error("Không tìm thấy tài khoản từ refresh token: {}", username);
          return new NotFoundException(AuthErrorCode.G7_AUTO_00206);
        });

    if (!jwtService.isTokenValid(request.getRefreshToken(), account)) {
      log.error("Refresh token không hợp lệ cho người dùng: {}", username);
      throw new BadRequestException(AuthErrorCode.G7_AUTO_00206);
    }

    String accessToken = jwtService.generateToken(account);
    return new AuthResponse(accessToken, request.getRefreshToken());
  }

  @Override
  public AccountResponse getProfile(Account account) {
    return accountMapper.toResponse(account);
  }

  @Override
  @Transactional
  public AccountResponse initSuperAdmin() {
    if (accountRepository.existsByUsername("superadmin")) {
      log.error("Đã tồn tại tài khoản SUPERADMIN trên hệ thống");
      throw new ConflictException(AuthErrorCode.G7_AUTO_00213);
    }

    Account superAdmin = new Account();
    superAdmin.setUsername("superadmin");
    superAdmin.setPassword(passwordEncoder.encode("G7Auto@2024"));
    superAdmin.setEmail("admin@g7auto.com.vn");
    superAdmin.setFullName("System Super Admin");
    superAdmin.setRoles(List.of(Role.SUPERADMIN));
    superAdmin.setStatus(AccountStatus.ACTIVE);
    superAdmin.setFailedLoginAttempts(0);

    return accountMapper.toResponse(accountRepository.save(superAdmin));
  }
}
