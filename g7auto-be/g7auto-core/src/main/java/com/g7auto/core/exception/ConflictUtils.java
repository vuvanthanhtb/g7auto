package com.g7auto.core.exception;

import com.g7auto.core.constant.codes.AuthErrorCode;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ConflictUtils {

  private static final Logger log =
      LoggerFactory.getLogger(ConflictUtils.class);

  private ConflictUtils() {
  }

  public static ConflictException usernameConflict(String username) {
    log.error("Tên đăng nhập đã tồn tại: {}", username);
    return new ConflictException(AuthErrorCode.G7_AUTO_00210);
  }

  public static ConflictException emailConflict(String email) {
    log.error("Email đã tồn tại trên hệ thống: {}", email);
    return new ConflictException(AuthErrorCode.G7_AUTO_00211);
  }

  public static ConflictException nationalIdConflict(String nationalId) {
    log.error("Số CCCD/CMND đã tồn tại trên hệ thống: {}", nationalId);
    return new ConflictException(AuthErrorCode.G7_AUTO_00211);
  }
}
