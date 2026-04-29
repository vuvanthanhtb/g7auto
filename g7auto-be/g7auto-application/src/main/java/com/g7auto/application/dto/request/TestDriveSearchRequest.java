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
public class TestDriveSearchRequest extends BaseSearchRequest {

  @Schema(description = "Trạng thái lịch lái thử (PENDING, CONFIRMED, COMPLETED, CANCELLED)")
  String status;

  @Schema(description = "ID Khách hàng")
  Long customerId;

  @Schema(description = "ID Showroom")
  Long showroomId;

}
