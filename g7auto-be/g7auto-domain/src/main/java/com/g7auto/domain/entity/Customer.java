package com.g7auto.domain.entity;

import com.g7auto.core.entity.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
@Table(name = "customers")
@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
//Hồ sơ khách hàng
public class Customer extends BaseEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  Long id;

  @Column(nullable = false, length = 150, comment = "Họ tên khách hàng")
  String fullName;

  @Column(length = 20, comment = "Số điện thoại (dùng để tra cứu)")
  String phone;

  @Column(length = 150, comment = "Email khách hàng")
  String email;

  @Column(length = 500, comment = "Địa chỉ liên lạc")
  String address;

  @Column(comment = "Ngày sinh")
  LocalDate birthDate;

  @Column(length = 20, comment = "Số CCCD/CMND")
  String nationalId;

  @Column(length = 100, comment = "Nguồn khách hàng (Walk-in, Online, Facebook...)")
  String sourceType;

  @Column(length = 500, comment = "Các mẫu xe khách hàng quan tâm")
  String carInterest;

  @Column(name = "assigned_employee_id", comment = "Nhân viên Sale phụ trách chăm sóc (FK)")
  Long assignedEmployeeId;

  @Column(columnDefinition = "TEXT", comment = "Ghi chú đặc điểm khách hàng")
  String notes;
}
