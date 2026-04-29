package com.g7auto.core.utils;

import com.g7auto.core.constant.codes.SystemErrorCode;
import com.g7auto.core.entity.Role;
import com.g7auto.core.exception.BadRequestException;
import java.util.List;
import java.util.Objects;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public final class RoleUtils {

  private static final Logger log =
      LoggerFactory.getLogger(RoleUtils.class);

  public static boolean hasRole(String role) {
    Authentication auth = SecurityContextHolder.getContext().getAuthentication();
    if (auth == null) {
      log.error("Bạn cần đăng nhập để xem nội dung này.");
      throw new BadRequestException(SystemErrorCode.G7_AUTO_00104);
    }
    return Objects.requireNonNull(auth).getAuthorities().stream()
        .anyMatch(a -> role.equals(a.getAuthority()));
  }

  public static boolean containsRole(List<Role> roles, Role role) {
    return roles != null && roles.contains(role);
  }
}
