package com.g7auto.application.dto.response;

import com.g7auto.core.export.annotation.ExcelColumn;

public record ShowroomResponse(
    Long id,
    @ExcelColumn(header = "Tên showroom", order = 1) String name,
    @ExcelColumn(header = "Địa chỉ", order = 2) String address,
    @ExcelColumn(header = "Số điện thoại", order = 3) String phone,
    @ExcelColumn(header = "Email", order = 4) String email,
    @ExcelColumn(header = "Quản lý", order = 5) String manager,
    @ExcelColumn(header = "Trạng thái", order = 6) String status,
    String createdAt,
    String updatedAt
) {

}
