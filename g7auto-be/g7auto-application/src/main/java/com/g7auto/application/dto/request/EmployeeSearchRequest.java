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
public class EmployeeSearchRequest extends BaseSearchRequest {

  @Schema(description = "Họ và tên nhân viên (tìm kiếm gần đúng)")
  String fullName;

  @Schema(description = "ID Showroom")
  Long showroomId;

  @Schema(description = "Trạng thái nhân viên (ACTIVE, LEAVED)")
  String employeeStatus;

}
