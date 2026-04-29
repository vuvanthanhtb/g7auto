package com.g7auto.core.search;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BaseSearchRequest {

  @Schema(description = "Số trang (bắt đầu từ 1)", example = "1")
  Integer page;

  @Schema(description = "Số bản ghi mỗi trang", example = "10")
  Integer size;

  @Schema(description = "Sắp xếp (vd: createdAt,desc)")
  String sort;

  @Schema(description = "Ngày cập nhật từ (yyyy-MM-dd)")
  String fromDate;

  @Schema(description = "Ngày cập nhật đến (yyyy-MM-dd)")
  String toDate;
}
