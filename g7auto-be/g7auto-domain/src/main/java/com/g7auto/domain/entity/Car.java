package com.g7auto.domain.entity;

import com.g7auto.core.entity.BaseEntity;
import com.g7auto.core.entity.CarStatus;
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
import jakarta.persistence.Table;
import java.math.BigDecimal;
import java.time.LocalDate;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "cars")
@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
//Danh sách từng xe vật lý cụ thể
public class Car extends BaseEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  Long id;

  @Column(unique = true, nullable = false, length = 50, comment = "Số khung (VIN) - duy nhất")
  String chassisNumber;

  @Column(unique = true, nullable = false, length = 50, comment = "Số máy - duy nhất")
  String engineNumber;

  @Column(length = 20, comment = "Biển số xe (nếu có)")
  String licensePlate;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "car_model_id", nullable = false, comment = "Liên kết tới mẫu xe (FK)")
  CarModel carModel;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "showroom_id", nullable = false, comment = "Showroom đang lưu kho xe này (FK)")
  Showroom showroom;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false, comment = "Trạng thái (AVAILABLE, DEPOSITED, SOLD, TRANSFERRING)")
  CarStatus status;

  @Column(precision = 20, scale = 2, comment = "Giá bán thực tế áp dụng cho xe này")
  BigDecimal salePrice;

  @Column(comment = "Ngày nhập xe về kho")
  LocalDate arrivalDate;

  @Column(comment = "Năm sản xuất thực tế")
  Integer year;

  @Column(columnDefinition = "TEXT", comment = "Ghi chú về tình trạng xe")
  String notes;
}
