package com.g7auto.application.dto.response;

import com.g7auto.core.export.annotation.ExcelColumn;
import java.math.BigDecimal;
import java.time.LocalDateTime;

public record PaymentResponse(
    Long id,
    Long contractId,
    @ExcelColumn(header = "Số hợp đồng", order = 1) String contractNumber,
    @ExcelColumn(header = "Đợt thanh toán", order = 2) Integer installmentNumber,
    @ExcelColumn(header = "Số tiền", order = 3, format = "#,##0") BigDecimal amount,
    @ExcelColumn(header = "Thời gian thanh toán", order = 4) LocalDateTime paymentTime,
    @ExcelColumn(header = "Phương thức", order = 5) String method,
    @ExcelColumn(header = "Trạng thái", order = 6) String status,
    Long collectorId,
    @ExcelColumn(header = "Thu ngân", order = 7) String collectorName,
    @ExcelColumn(header = "Mã giao dịch", order = 8) String transactionCode,
    String notes,
    String createdAt
) {

}
