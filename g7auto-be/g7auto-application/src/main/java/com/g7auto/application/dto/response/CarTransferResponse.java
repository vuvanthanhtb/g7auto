package com.g7auto.application.dto.response;

import com.g7auto.core.export.annotation.ExcelColumn;
import java.time.LocalDate;

public record CarTransferResponse(
    Long id,
    Long carId,
    @ExcelColumn(header = "Số khung xe", order = 1) String carChassisNumber,
    Long fromShowroomId,
    @ExcelColumn(header = "Từ showroom", order = 2) String fromShowroomName,
    Long toShowroomId,
    @ExcelColumn(header = "Đến showroom", order = 3) String toShowroomName,
    Long createdByEmployeeId,
    @ExcelColumn(header = "Ngày điều chuyển", order = 4) LocalDate transferDate,
    @ExcelColumn(header = "Ngày nhận dự kiến", order = 5) LocalDate expectedReceiveDate,
    @ExcelColumn(header = "Ngày nhận thực tế", order = 6) LocalDate actualReceiveDate,
    @ExcelColumn(header = "Trạng thái", order = 7) String status,
    @ExcelColumn(header = "Lý do", order = 8) String reason,
    String notes,
    String createdAt
) {

}
