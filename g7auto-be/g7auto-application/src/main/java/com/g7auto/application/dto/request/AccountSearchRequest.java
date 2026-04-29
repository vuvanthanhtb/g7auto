package com.g7auto.application.dto.request;

import com.g7auto.core.search.BaseSearchRequest;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AccessLevel;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.FieldDefaults;

@EqualsAndHashCode(callSuper = true)
@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AccountSearchRequest extends BaseSearchRequest {

  @Schema(description = "Tên đăng nhập (tìm kiếm gần đúng)")
  String username;

  @Schema(description = "Họ và tên (tìm kiếm gần đúng)")
  String fullName;

  @Schema(description = "Trạng thái tài khoản (ACTIVE, LOCKED...)")
  String status;

  @Schema(description = "Quyền/vai trò (ADMIN, SALE...)")
  String role;

  @Schema(description = "Ngày tạo từ (yyyy-MM-dd)")
  String fromDate;

  @Schema(description = "Ngày tạo đến (yyyy-MM-dd)")
  String toDate;
}
