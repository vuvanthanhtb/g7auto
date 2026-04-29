package com.g7auto.application.dto.response;

import com.g7auto.core.export.annotation.ExcelColumn;
import java.time.LocalDateTime;

public record TestDriveResponse(
    Long id,
    Long customerId,
    @ExcelColumn(header = "Khách hàng", order = 1) String customerFullName,
    Long carId,
    @ExcelColumn(header = "Số khung xe", order = 2) String carChassisNumber,
    Long employeeId,
    @ExcelColumn(header = "Nhân viên", order = 3) String employeeFullName,
    Long showroomId,
    @ExcelColumn(header = "Showroom", order = 4) String showroomName,
    @ExcelColumn(header = "Thời gian bắt đầu", order = 5) LocalDateTime startTime,
    @ExcelColumn(header = "Thời gian kết thúc", order = 6) LocalDateTime endTime,
    @ExcelColumn(header = "Trạng thái", order = 7) String status,
    String notes,
    String createdAt
) {

}
