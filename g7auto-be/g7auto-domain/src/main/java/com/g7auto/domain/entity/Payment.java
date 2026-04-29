package com.g7auto.domain.entity;

import com.g7auto.core.entity.BaseEntity;
import com.g7auto.core.entity.PaymentMethod;
import com.g7auto.core.entity.PaymentStatus;
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
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "payments")
@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
//Chi tiết các đợt thanh toán của hợp đồng
public class Payment extends BaseEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  Long id;
  
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "contract_id", nullable = false, comment = "Hợp đồng thanh toán (FK)")
  Contract contract;

  @Column(nullable = false, comment = "Đợt thanh toán thứ mấy")
  Integer installmentNumber;

  @Column(nullable = false, precision = 20, scale = 2, comment = "Số tiền thanh toán đợt này")
  BigDecimal amount;

  @Column(nullable = false, comment = "Thời điểm thực hiện thanh toán")
  LocalDateTime paymentTime;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false, comment = "Hình thức (CASH, BANK_TRANSFER, CREDIT_CARD)")
  PaymentMethod method;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false, comment = "Trạng thái (PENDING, CONFIRMED, FAILED)")
  PaymentStatus status;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "collector_id", comment = "Nhân viên kế toán/thu ngân xác nhận (FK)")
  Employee collector;

  @Column(length = 200, comment = "Mã giao dịch ngân hàng (nếu có)")
  String transactionCode;

  @Column(columnDefinition = "TEXT", comment = "Ghi chú thanh toán")
  String notes;
}
