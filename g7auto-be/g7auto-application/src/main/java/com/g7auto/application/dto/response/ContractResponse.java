package com.g7auto.application.dto.response;

import com.g7auto.core.export.annotation.ExcelColumn;
import java.math.BigDecimal;
import java.time.LocalDate;

public record ContractResponse(
    Long id,
    @ExcelColumn(header = "Số hợp đồng", order = 1) String contractNumber,
    Long customerId,
    @ExcelColumn(header = "Khách hàng", order = 2) String customerFullName,
    Long carId,
    @ExcelColumn(header = "Số khung xe", order = 3) String carChassisNumber,
    Long employeeId,
    @ExcelColumn(header = "Nhân viên", order = 4) String employeeFullName,
    @ExcelColumn(header = "Ngày ký", order = 5) LocalDate signDate,
    @ExcelColumn(header = "Ngày giao dự kiến", order = 6) LocalDate expectedDeliveryDate,
    @ExcelColumn(header = "Ngày giao thực tế", order = 7) LocalDate actualDeliveryDate,
    @ExcelColumn(header = "Giá trị HĐ", order = 8, format = "#,##0") BigDecimal contractValue,
    @ExcelColumn(header = "Đã thanh toán", order = 9, format = "#,##0") BigDecimal paidAmount,
    @ExcelColumn(header = "Còn lại", order = 10, format = "#,##0") BigDecimal remainingAmount,
    @ExcelColumn(header = "Trạng thái", order = 11) String status,
    String notes,
    String createdAt,
    String updatedAt
) {

}
