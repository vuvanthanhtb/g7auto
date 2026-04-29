package com.g7auto.application.dto.response;

import com.g7auto.core.export.annotation.ExcelColumn;
import java.math.BigDecimal;

public record QuotationResponse(
    Long id,
    Long customerId,
    @ExcelColumn(header = "Khách hàng", order = 1) String customerFullName,
    Long carId,
    @ExcelColumn(header = "Số khung xe", order = 2) String carChassisNumber,
    Long employeeId,
    @ExcelColumn(header = "Nhân viên", order = 3) String employeeFullName,
    @ExcelColumn(header = "Giá xe", order = 4, format = "#,##0") BigDecimal carPrice,
    @ExcelColumn(header = "Phụ kiện", order = 5, format = "#,##0") BigDecimal accessories,
    @ExcelColumn(header = "Khuyến mãi", order = 6, format = "#,##0") BigDecimal promotion,
    BigDecimal otherCosts,
    @ExcelColumn(header = "Tổng tiền", order = 7, format = "#,##0") BigDecimal totalAmount,
    @ExcelColumn(header = "Trạng thái", order = 8) String status,
    String notes,
    String createdAt
) {

}
