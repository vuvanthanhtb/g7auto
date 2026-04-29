package com.g7auto.domain.entity;

import com.g7auto.core.entity.BaseEntity;
import com.g7auto.core.entity.DepositStatus;
import com.g7auto.core.entity.DepositPaymentMethod;
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
@Table(name = "deposits")
@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
//Giao dịch đặt cọc giữ xe
public class Deposit extends BaseEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "quotation_id", comment = "Tham chiếu từ báo giá nào (nếu có)")
  Quotation quotation;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "customer_id", nullable = false, comment = "Khách hàng đặt cọc (FK)")
  Customer customer;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "car_id", nullable = false, comment = "Xe được đặt giữ (FK)")
  Car car;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "employee_id", comment = "Nhân viên thu cọc (FK)")
  Employee employee;

  @Column(nullable = false, precision = 20, scale = 2, comment = "Số tiền đặt cọc")
  BigDecimal amount;

  @Column(nullable = false, comment = "Ngày đặt cọc")
  LocalDate depositDate;

  @Column(comment = "Ngày hết hạn giữ xe nếu không ký hợp đồng")
  LocalDate expiryDate;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false, comment = "Phương thức (CASH, BANK_TRANSFER)")
  DepositPaymentMethod depositPaymentMethod;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false, comment = "Trạng thái (ACTIVE, COMPLETED, CANCELLED)")
  DepositStatus status;

  @Column(columnDefinition = "TEXT", comment = "Ghi chú về thỏa thuận cọc")
  String notes;
}
