package com.g7auto.application.dto.response;

import com.g7auto.core.export.annotation.ExcelColumn;
import java.time.LocalDate;

public record EmployeeResponse(
    Long id,
    @ExcelColumn(header = "Họ và tên", order = 1) String fullName,
    @ExcelColumn(header = "Số điện thoại", order = 2) String phone,
    @ExcelColumn(header = "Email", order = 3) String email,
    String address,
    @ExcelColumn(header = "Ngày sinh", order = 4) LocalDate birthDate,
    @ExcelColumn(header = "Giới tính", order = 5) String gender,
    @ExcelColumn(header = "CCCD/CMND", order = 6) String nationalId,
    @ExcelColumn(header = "Ngày vào làm", order = 7) LocalDate joinDate,
    @ExcelColumn(header = "Trạng thái", order = 8) String employeeStatus,
    Long showroomId,
    @ExcelColumn(header = "Chi nhánh", order = 9) String showroomName,
    String username,
    String createdAt,
    String updatedAt
) {

}
