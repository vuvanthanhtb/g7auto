package com.g7auto.domain.entity;

import com.g7auto.core.entity.BaseEntity;
import com.g7auto.core.entity.ContractStatus;
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
@Table(name = "contracts")
@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
//Hợp đồng mua bán xe chính thức
public class Contract extends BaseEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  Long id;

  @Column(unique = true, nullable = false, length = 50, comment = "Số hợp đồng (duy nhất)")
  String contractNumber;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "customer_id", nullable = false, comment = "Bên mua (FK)")
  Customer customer;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "car_id", nullable = false, comment = "Đối tượng xe mua bán (FK)")
  Car car;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "employee_id", comment = "Nhân viên Sale phụ trách hợp đồng (FK)")
  Employee employee;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "deposit_id", comment = "Tham chiếu phiếu đặt cọc tương ứng (FK)")
  Deposit deposit;

  @Column(nullable = false, comment = "Ngày ký hợp đồng")
  LocalDate signDate;

  @Column(comment = "Ngày dự kiến giao xe")
  LocalDate expectedDeliveryDate;

  @Column(comment = "Ngày thực tế bàn giao xe cho khách")
  LocalDate actualDeliveryDate;

  @Column(nullable = false, precision = 20, scale = 2, comment = "Tổng giá trị hợp đồng")
  BigDecimal contractValue;

  @Column(precision = 20, scale = 2, comment = "Số tiền khách đã thanh toán")
  BigDecimal paidAmount = BigDecimal.ZERO;

  @Column(precision = 20, scale = 2, comment = "Số tiền còn nợ lại")
  BigDecimal remainingAmount;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false, comment = "Trạng thái (DRAFT, SIGNED, COMPLETED, CANCELLED)")
  ContractStatus status;

  @Column(columnDefinition = "TEXT", comment = "Ghi chú hợp đồng")
  String notes;
}
