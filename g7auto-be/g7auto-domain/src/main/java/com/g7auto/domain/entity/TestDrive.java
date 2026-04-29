package com.g7auto.domain.entity;

import com.g7auto.core.entity.BaseEntity;
import com.g7auto.core.entity.TestDriveStatus;
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
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "test_drives")
@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
//Quản lý đăng ký và thực hiện lái thử xe demo
public class TestDrive extends BaseEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "customer_id", nullable = false, comment = "Khách hàng đăng ký lái thử (FK)")
  Customer customer;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "car_id", nullable = false, comment = "Xe demo được chọn lái thử (FK)")
  Car car;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "employee_id", comment = "Nhân viên sale đi kèm hỗ trợ (FK)")
  Employee employee;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "showroom_id", comment = "Địa điểm thực hiện lái thử (FK)")
  Showroom showroom;

  @Column(nullable = false, comment = "Thời điểm bắt đầu dự kiến")
  LocalDateTime startTime;

  @Column(nullable = false, comment = "Thời điểm kết thúc dự kiến")
  LocalDateTime endTime;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false, comment = "Trạng thái (SCHEDULED, COMPLETED, CANCELLED)")
  TestDriveStatus status;

  @Column(columnDefinition = "TEXT", comment = "Nhận xét của khách sau khi lái thử")
  String notes;
}
