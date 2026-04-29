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
public class AccountApprovingSearchRequest extends BaseSearchRequest {

  @Schema(description = "Tên đăng nhập (tìm kiếm gần đúng)")
  String username;

  @Schema(description = "Họ và tên (tìm kiếm gần đúng)")
  String fullName;

  @Schema(description = "Trạng thái phê duyệt (AWAITING_APPROVAL, APPROVED, REJECTED)")
  String statusApproving;

  @Schema(description = "Hành động (CREATE, UPDATE, DELETE, CHANGE_ROLES, CHANGE_PASSWORD, LOCK, UNLOCK)")
  String action;

}
