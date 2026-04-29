package com.g7auto.application.dto.request;

import com.g7auto.core.constant.codes.ValidationErrorCode;
import com.g7auto.core.search.BaseSearchRequest;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.FieldDefaults;

@EqualsAndHashCode(callSuper = true)
@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ServiceHistorySearchRequest extends BaseSearchRequest {

  @Schema(description = "ID Khách hàng")
  @NotNull(message = ValidationErrorCode.G7_AUTO_00800)
  Long customerId;

}
