package com.g7auto.application.dto.request;

import com.g7auto.core.entity.ContractStatus;
import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDate;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ContractUpdateRequest {

  @Schema(description = "Ngày thực tế bàn giao xe")
  LocalDate actualDeliveryDate;

  @Schema(description = "Trạng thái hợp đồng")
  ContractStatus status;

  @Schema(description = "Ghi chú")
  String notes;
}
