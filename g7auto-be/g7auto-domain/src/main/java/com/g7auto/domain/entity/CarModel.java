package com.g7auto.domain.entity;

import com.g7auto.core.entity.BaseEntity;
import com.g7auto.core.entity.CarModelStatus;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.math.BigDecimal;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "car_models")
@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
//Danh mục các dòng xe/mẫu xe
public class CarModel extends BaseEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  Long id;

  @Column(nullable = false, length = 200, comment = "Tên mẫu xe (ví dụ: Toyota Camry)")
  String name;

  @Column(length = 100, comment = "Hãng sản xuất (Toyota, Honda...)")
  String manufacturer;

  @Column(length = 100, comment = "Dòng xe (Sedan, SUV...)")
  String series;

  @Column(length = 50, comment = "Đời xe/Năm sản xuất")
  String year;

  @Column(length = 100, comment = "Màu sắc mẫu")
  String color;

  @Column(length = 50, comment = "Loại xe (Số sàn, số tự động)")
  String carType;

  @Column(length = 100, comment = "Thông số động cơ")
  String engine;

  @Column(length = 50, comment = "Loại hộp số")
  String transmission;

  @Column(precision = 20, scale = 2, comment = "Giá niêm yết của hãng")
  BigDecimal listedPrice;

  @Column(columnDefinition = "TEXT", comment = "Mô tả chi tiết tính năng")
  String description;

  @Column(nullable = false, length = 20, comment = "Trạng thái kinh doanh (ACTIVE, STOPPED)")
  @Enumerated(EnumType.STRING)
  CarModelStatus status;
}
