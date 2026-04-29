package com.g7auto.domain.entity;

import com.g7auto.core.entity.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
@Table(name = "service_histories")
@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
//Lịch sử chăm sóc khách hàng / Nhật ký CRM
public class ServiceHistory extends BaseEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "customer_id", nullable = false, comment = "Khách hàng được chăm sóc (FK)")
  Customer customer;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "employee_id", comment = "Nhân viên thực hiện chăm sóc (FK)")
  Employee employee;

  @Column(nullable = false, comment = "Thời điểm tương tác với khách")
  LocalDateTime serviceDate;

  @Column(nullable = false, length = 20, comment = "Hình thức (CALL, EMAIL, MEETING, ZALO...)")
  String contactType;

  @Column(columnDefinition = "TEXT", comment = "Nội dung cuộc trao đổi")
  String content;

  @Column(columnDefinition = "TEXT", comment = "Kết quả tương tác")
  String result;

  @Column(comment = "Ngày hẹn nhắc lại chăm sóc lần sau")
  LocalDateTime nextReminderDate;
}
