package com.g7auto.application.dto.response;

import com.g7auto.core.export.annotation.ExcelColumn;
import java.math.BigDecimal;

public record CarResponse(
    Long id,
    @ExcelColumn(header = "Số khung", order = 1) String chassisNumber,
    @ExcelColumn(header = "Số máy", order = 2) String engineNumber,
    @ExcelColumn(header = "Biển số", order = 3) String licensePlate,
    Long carModelId,
    @ExcelColumn(header = "Mẫu xe", order = 4) String carModelName,
    Long showroomId,
    @ExcelColumn(header = "Showroom", order = 5) String showroomName,
    @ExcelColumn(header = "Trạng thái", order = 6) String status,
    @ExcelColumn(header = "Giá bán", order = 7, format = "#,##0") BigDecimal salePrice,
    String notes,
    String createdAt,
    String updatedAt
) {

}
