package com.g7auto.core.entity;

import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

@Getter
@Setter
@MappedSuperclass
@FieldDefaults(level = AccessLevel.PRIVATE)
public abstract class BaseEntity {

  @Column(name = "created_at", updatable = false, comment = "Thời điểm tạo bản ghi")
  LocalDateTime createdAt;

  @Column(name = "updated_at", comment = "Thời điểm cập nhật bản ghi gần nhất")
  LocalDateTime updatedAt;

  @Column(name = "created_by", updatable = false, length = 100, comment = "Người tạo bản ghi")
  String createdBy;

  @Column(name = "updated_by", length = 100, comment = "Người cập nhật bản ghi gần nhất")
  String updatedBy;

  @PrePersist
  protected void onCreate() {
    String actor = getCurrentUsername();
    this.createdAt = LocalDateTime.now();
    this.updatedAt = LocalDateTime.now();
    this.createdBy = actor;
    this.updatedBy = actor;
  }

  @PreUpdate
  protected void onUpdate() {
    this.updatedAt = LocalDateTime.now();
    this.updatedBy = getCurrentUsername();
  }

  String getCurrentUsername() {
    Authentication auth = SecurityContextHolder.getContext()
        .getAuthentication();
    if (auth != null && auth.isAuthenticated() && !"anonymousUser".equals(
        auth.getPrincipal())) {
      return auth.getName();
    }
    return "SYSTEM";
  }
}
