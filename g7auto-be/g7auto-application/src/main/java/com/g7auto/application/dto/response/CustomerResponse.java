package com.g7auto.application.dto.response;

import com.g7auto.core.export.annotation.ExcelColumn;
import java.time.LocalDate;

public record CustomerResponse(
    Long id,
    @ExcelColumn(header = "Họ và tên", order = 1) String fullName,
    @ExcelColumn(header = "Số điện thoại", order = 2) String phone,
    @ExcelColumn(header = "Email", order = 3) String email,
    @ExcelColumn(header = "Địa chỉ", order = 4) String address,
    @ExcelColumn(header = "Ngày sinh", order = 5) LocalDate birthDate,
    @ExcelColumn(header = "CCCD/CMND", order = 6) String nationalId,
    @ExcelColumn(header = "Nguồn KH", order = 7) String sourceType,
    @ExcelColumn(header = "Xe quan tâm", order = 8) String carInterest,
    Long assignedEmployeeId,
    String assignedEmployeeName,
    @ExcelColumn(header = "Ghi chú", order = 9) String notes,
    String createdAt,
    String updatedAt
) {

}
