package com.g7auto.application.dto.response;

import com.g7auto.core.export.annotation.ExcelColumn;
import java.math.BigDecimal;

public record CarModelResponse(
    Long id,
    @ExcelColumn(header = "Tên mẫu xe", order = 1) String name,
    @ExcelColumn(header = "Hãng sản xuất", order = 2) String manufacturer,
    @ExcelColumn(header = "Dòng xe", order = 3) String series,
    @ExcelColumn(header = "Đời xe", order = 4) String year,
    @ExcelColumn(header = "Màu sắc", order = 5) String color,
    @ExcelColumn(header = "Loại xe", order = 6) String carType,
    @ExcelColumn(header = "Động cơ", order = 7) String engine,
    @ExcelColumn(header = "Hộp số", order = 8) String transmission,
    @ExcelColumn(header = "Giá niêm yết", order = 9, format = "#,##0") BigDecimal listedPrice,
    String description,
    @ExcelColumn(header = "Trạng thái", order = 10) String status,
    String createdAt,
    String updatedAt
) {

}
