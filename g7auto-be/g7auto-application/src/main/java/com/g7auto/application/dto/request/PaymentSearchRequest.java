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
public class PaymentSearchRequest extends BaseSearchRequest {

  @Schema(description = "Trạng thái thanh toán (PENDING, CONFIRMED, FAILED)")
  String status;

  @Schema(description = "ID Hợp đồng")
  Long contractId;

}
