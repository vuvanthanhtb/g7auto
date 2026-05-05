package com.g7auto.domain.entity;

import com.g7auto.core.entity.ApprovingStatus;
import com.g7auto.core.entity.BaseEntity;
import com.g7auto.core.entity.EmployeeApprovalAction;
import com.g7auto.core.entity.EmployeeStatus;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import java.time.LocalDate;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "employees_approving")
@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
//Thông tin nhân viên chi tiết
public class EmployeeApproval extends BaseEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  Long id;

  @Column(nullable = false, length = 150, comment = "Họ và tên nhân viên")
  String fullName;

  @Column(length = 20, comment = "Số điện thoại cá nhân")
  String phone;

  @Column(length = 150, comment = "Email cá nhân")
  String email;

  @Column(length = 500, comment = "Địa chỉ thường trú")
  String address;

  @Column(comment = "Ngày sinh")
  LocalDate birthDate;

  @Column(length = 10, comment = "Giới tính")
  String gender;

  @Column(length = 20, comment = "Số CCCD/CMND")
  String nationalId;

  @Column(comment = "Ngày vào làm")
  LocalDate joinDate;

  @Column(nullable = false, length = 20, comment = "Trạng thái nhân viên (ACTIVE, LEAVED)")
  @Enumerated(EnumType.STRING)
  EmployeeStatus employeeStatus;

  Long showroom_id;

  @Column(length = 100, comment = "Tên đăng nhập đề xuất")
  String username;

  @Column(nullable = false, length = 20, comment = "Hành động")
  @Enumerated(EnumType.STRING)
  EmployeeApprovalAction employeeApprovalAction;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false, comment = "Trạng thái tài khoản (APPROVED, REJECTED, AWAITING_APPROVAL)")
  ApprovingStatus statusApproving;
}
