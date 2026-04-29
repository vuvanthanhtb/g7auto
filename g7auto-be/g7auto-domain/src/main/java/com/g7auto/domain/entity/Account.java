package com.g7auto.domain.entity;

import com.g7auto.core.converter.RoleListConverter;
import com.g7auto.core.entity.AccountStatus;
import com.g7auto.core.entity.BaseEntity;
import com.g7auto.core.entity.Role;
import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.jspecify.annotations.NullMarked;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "accounts")
@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
//Tài khoản người dùng hệ thống
public class Account extends BaseEntity implements UserDetails {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  Long id;

  @Column(unique = true, nullable = false, length = 100, comment = "Tên đăng nhập (duy nhất)")
  String username;

  @Column(nullable = false, comment = "Mật khẩu đã mã hóa")
  String password;

  @Column(unique = true, nullable = false, length = 150, comment = "Email người dùng (duy nhất)")
  String email;

  @Column(length = 150, comment = "Họ và tên đầy đủ")
  String fullName;

  @Convert(converter = RoleListConverter.class)
  List<Role> roles;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false, comment = "Trạng thái tài khoản (ACTIVE, LOCKED, INACTIVE)")
  AccountStatus status;

  @Column(nullable = false, columnDefinition = "int default 0", comment = "Số lần đăng nhập sai liên tiếp")
  int failedLoginAttempts;

  @Override
  @NullMarked
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return (roles != null ? roles : Collections.<Role>emptyList())
        .stream().map(r -> new SimpleGrantedAuthority(r.name())).toList();
  }

  @Override
  public boolean isAccountNonLocked() {
    return status != AccountStatus.LOCKED;
  }

  @Override
  public boolean isEnabled() {
    return status == AccountStatus.ACTIVE;
  }
}
