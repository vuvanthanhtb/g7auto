package com.g7auto.application.dto.response;

import com.g7auto.core.export.annotation.ExcelColumn;
import java.time.LocalDateTime;

public record ServiceHistoryResponse(
    Long id,
    Long customerId,
    @ExcelColumn(header = "Khách hàng", order = 1) String customerFullName,
    Long employeeId,
    @ExcelColumn(header = "Nhân viên", order = 2) String employeeFullName,
    @ExcelColumn(header = "Ngày phục vụ", order = 3) LocalDateTime serviceDate,
    @ExcelColumn(header = "Loại liên hệ", order = 4) String contactType,
    @ExcelColumn(header = "Nội dung", order = 5) String content,
    @ExcelColumn(header = "Kết quả", order = 6) String result,
    LocalDateTime nextReminderDate,
    String createdAt
) {

}
