package com.g7auto.application.dto.response;

import com.g7auto.core.export.annotation.ExcelColumn;
import java.math.BigDecimal;
import java.time.LocalDate;

public record DepositResponse(
    Long id,
    Long quotationId,
    Long customerId,
    @ExcelColumn(header = "Khách hàng", order = 1) String customerFullName,
    Long carId,
    @ExcelColumn(header = "Số khung xe", order = 2) String carChassisNumber,
    Long employeeId,
    @ExcelColumn(header = "Nhân viên", order = 3) String employeeFullName,
    @ExcelColumn(header = "Số tiền", order = 4, format = "#,##0") BigDecimal amount,
    @ExcelColumn(header = "Ngày đặt cọc", order = 5) LocalDate depositDate,
    @ExcelColumn(header = "Ngày hết hạn", order = 6) LocalDate expiryDate,
    @ExcelColumn(header = "Phương thức", order = 7) String paymentMethod,
    @ExcelColumn(header = "Trạng thái", order = 8) String status,
    String notes,
    String createdAt
) {

}
