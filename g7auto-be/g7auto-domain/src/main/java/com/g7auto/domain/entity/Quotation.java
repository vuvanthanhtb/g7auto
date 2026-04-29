package com.g7auto.domain.entity;

import com.g7auto.core.entity.BaseEntity;
import com.g7auto.core.entity.QuotationStatus;
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
@Table(name = "quotations")
@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
//Bảng dự toán kinh phí cho khách hàng
public class Quotation extends BaseEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "customer_id", nullable = false, comment = "Khách hàng nhận báo giá (FK)")
  Customer customer;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "car_id", nullable = false, comment = "Xe được báo giá (FK)")
  Car car;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "employee_id", comment = "Nhân viên lập báo giá (FK)")
  Employee employee;

  @Column(precision = 20, scale = 2, comment = "Giá xe trong báo giá")
  BigDecimal carPrice;

  @Column(precision = 20, scale = 2, comment = "Tổng chi phí phụ kiện kèm theo")
  BigDecimal accessories;

  @Column(precision = 20, scale = 2, comment = "Giá trị khuyến mãi/giảm giá")
  BigDecimal promotion;

  @Column(precision = 20, scale = 2, comment = "Các chi phí khác (thuế, phí biển số...)")
  BigDecimal otherCosts;

  @Column(precision = 20, scale = 2, comment = "Tổng giá trị dự toán cuối cùng")
  BigDecimal totalAmount;

  @Column(nullable = false, comment = "Ngày lập dự toán")
  LocalDateTime createdDate;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false, comment = "Trạng thái (PENDING, APPROVED, REJECTED)")
  QuotationStatus status;

  @Column(columnDefinition = "TEXT", comment = "Ghi chú báo giá")
  String notes;
}
