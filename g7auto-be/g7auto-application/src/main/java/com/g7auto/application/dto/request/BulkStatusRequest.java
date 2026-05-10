package com.g7auto.application.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import java.util.List;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BulkStatusRequest {

  @Schema(description = "Hành động: APPROVE hoặc REJECT")
  @NotBlank
  String action;

  @Schema(description = "Danh sách tên đăng nhập cần duyệt/từ chối")
  @NotEmpty
  List<String> usernames;
}
