package com.g7auto.domain.entity;

import com.g7auto.core.entity.BaseEntity;
import com.g7auto.core.entity.TransferStatus;
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
import java.time.LocalDate;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "car_transfers")
@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
//Quản lý việc điều chuyển xe giữa các showroom chi nhánh
public class CarTransfer extends BaseEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "car_id", nullable = false, comment = "Xe cần điều chuyển (FK)")
  Car car;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "from_showroom_id", nullable = false, comment = "Showroom xuất (FK)")
  Showroom fromShowroom;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "to_showroom_id", nullable = false, comment = "Showroom nhập (FK)")
  Showroom toShowroom;

  @Column(name = "created_by_employee_id", comment = "Nhân viên tạo lệnh điều chuyển (FK)")
  Long createdByEmployeeId;

  @Column(comment = "Ngày thực hiện chuyển đi")
  LocalDate transferDate;

  @Column(comment = "Ngày dự kiến tới nơi")
  LocalDate expectedReceiveDate;

  @Column(comment = "Ngày thực tế nhận xe tại kho mới")
  LocalDate actualReceiveDate;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false, comment = "Trạng thái (PENDING, SHIPPED, RECEIVED, CANCELLED)")
  TransferStatus status;

  @Column(columnDefinition = "TEXT", comment = "Lý do điều chuyển xe")
  String reason;

  @Column(columnDefinition = "TEXT", comment = "Ghi chú quá trình vận chuyển")
  String notes;
}
