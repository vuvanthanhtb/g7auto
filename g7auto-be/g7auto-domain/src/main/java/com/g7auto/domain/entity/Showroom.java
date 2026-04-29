package com.g7auto.domain.entity;

import com.g7auto.core.entity.BaseEntity;
import com.g7auto.core.entity.ShowroomStatus;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "showrooms")
@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
//Quản lý các chi nhánh/Showroom
public class Showroom extends BaseEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  Long id;

  @Column(nullable = false, length = 100, comment = "Tên showroom")
  String name;

  @Column(nullable = false, length = 500, comment = "Địa chỉ chi tiết")
  String address;

  @Column(length = 20, comment = "Số điện thoại liên lạc")
  String phone;

  @Column(length = 50, comment = "Email của showroom")
  String email;

  @Column(length = 100, comment = "Tên người quản lý showroom")
  String manager;

  @Column(nullable = false, comment = "Trạng thái hoạt động (ACTIVE, INACTIVE)")
  @Enumerated(EnumType.STRING)
  ShowroomStatus status;
}
