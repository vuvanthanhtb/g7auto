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
public class CarModelSearchRequest extends BaseSearchRequest {

  @Schema(description = "Tên mẫu xe (tìm kiếm gần đúng)")
  String name;

  @Schema(description = "Hãng sản xuất (tìm kiếm gần đúng)")
  String manufacturer;

}
