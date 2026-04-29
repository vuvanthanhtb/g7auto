package com.g7auto.domain.entity;

import com.g7auto.core.converter.RoleListConverter;
import com.g7auto.core.entity.AccountApprovingAction;
import com.g7auto.core.entity.AccountApprovingStatus;
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
import java.util.List;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "accounts_approving")
@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
//Tài khoản chờ phê duyệt
public class AccountApproving extends BaseEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  Long id;

  @Column(nullable = false, length = 100, comment = "Tên đăng nhập (duy nhất)")
  String username;

  @Column(nullable = false, comment = "Mật khẩu đã mã hóa")
  String password;

  @Column(nullable = false, length = 150, comment = "Email người dùng (duy nhất)")
  String email;

  @Column(length = 150, comment = "Họ và tên đầy đủ")
  String fullName;

  @Column(comment = "Trạng thái tài khoản hiện tại của account đang chờ phê duyệt")
  String status;

  @Convert(converter = RoleListConverter.class)
  List<Role> roles;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false, comment = "Trạng thái tài khoản (APPROVED, REJECTED, AWAITING_APPROVAL)")
  AccountApprovingStatus statusApproving;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false, comment = "Hành động cần phê duyệt")
  AccountApprovingAction action;
}
