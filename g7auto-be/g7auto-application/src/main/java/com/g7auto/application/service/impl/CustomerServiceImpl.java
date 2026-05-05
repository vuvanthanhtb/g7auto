package com.g7auto.application.service.impl;

import com.g7auto.application.dto.request.CustomerRequest;
import com.g7auto.application.dto.request.CustomerSearchRequest;
import com.g7auto.application.dto.response.CustomerResponse;
import com.g7auto.application.dto.response.ImportResult;
import com.g7auto.application.mapper.CustomerMapper;
import com.g7auto.application.service.CustomerService;
import com.g7auto.core.constant.codes.SystemErrorCode;
import com.g7auto.core.exception.BadRequestException;
import com.g7auto.core.exception.ConflictException;
import com.g7auto.core.exception.NotFoundUtils;
import com.g7auto.core.export.ExcelExportHelper;
import com.g7auto.core.export.ExcelSupport;
import com.g7auto.core.response.PageResponse;
import com.g7auto.core.utils.PageableUtils;
import com.g7auto.domain.entity.Customer;
import com.g7auto.infrastructure.persistence.CustomerRepository;
import com.g7auto.infrastructure.persistence.query.CustomerQueryRepository;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@Slf4j
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {

  private final CustomerRepository customerRepository;
  private final CustomerQueryRepository customerQueryRepository;
  private final CustomerMapper customerMapper;

  @Override
  public PageResponse<CustomerResponse> search(CustomerSearchRequest request) {
    Pageable pageable = PageableUtils.from(request);
    return PageResponse.of(
        customerQueryRepository.search(request.getFullName(), request.getPhone(),
            request.getFromDate(), request.getToDate(), pageable),
        customerMapper::toResponse,
        request.getFromDate(), request.getToDate());
  }

  @Override
  public CustomerResponse findById(Long id) {
    return customerMapper.toResponse(get(id));
  }

  @Override
  @Transactional
  public CustomerResponse create(CustomerRequest customerRequest) {
    String phone = customerRequest.getPhone();
    if (phone != null && customerRepository.existsByPhone(phone)) {
      throw new ConflictException("Phone number already registered: " + phone);
    }
    Customer c = customerMapper.toEntity(customerRequest);
    return customerMapper.toResponse(customerRepository.save(c));
  }

  @Override
  @Transactional
  public CustomerResponse update(Long id, CustomerRequest customerRequest) {
    Customer update = get(id);
    customerMapper.updateEntity(customerRequest, update);
    return customerMapper.toResponse(customerRepository.save(update));
  }

  @Override
  @Transactional
  public void delete(Long id) {
    customerRepository.delete(get(id));
  }

  @Override
  public ImportResult importCustomers(MultipartFile file) {
    int total = 0, success = 0, failed = 0;
    List<String> errors = new ArrayList<>();

    try (Workbook wb = new XSSFWorkbook(file.getInputStream())) {
      Sheet sheet = wb.getSheetAt(0);
      for (int i = 1; i <= sheet.getLastRowNum(); i++) {
        Row row = sheet.getRow(i);
        if (row == null) {
          continue;
        }
        total++;
        try {
          CustomerRequest req = new CustomerRequest();
          req.setFullName(getCellString(row, 0));
          req.setPhone(getCellString(row, 1));
          req.setEmail(getCellString(row, 2));
          req.setAddress(getCellString(row, 3));
          req.setNationalId(getCellString(row, 4));
          req.setNotes(getCellString(row, 5));
          create(req);
          success++;
        } catch (Exception e) {
          failed++;
          errors.add("Dòng " + (i + 1) + ": " + e.getMessage());
        }
      }
    } catch (IOException e) {
      log.error("Lỗi đọc file import khách hàng: {}", e.getMessage());
      throw new BadRequestException(SystemErrorCode.G7_AUTO_00100);
    }

    return new ImportResult(total, success, failed, errors);
  }

  @Override
  public void downloadCustomerTemplate(HttpServletResponse response) {
    ExcelSupport.prepareResponse(response, "mau-import-khach-hang.xlsx");
    try (SXSSFWorkbook workbook = ExcelSupport.createWorkbook()) {
      Sheet sheet = workbook.createSheet("Customers");
      Row header = sheet.createRow(0);
      String[] cols = {"fullName", "phone", "email", "address", "nationalId", "notes"};
      for (int i = 0; i < cols.length; i++) {
        header.createCell(i).setCellValue(cols[i]);
      }
      workbook.write(response.getOutputStream());
    } catch (IOException e) {
      log.error("Lỗi tạo template khách hàng: {}", e.getMessage());
      throw new BadRequestException(SystemErrorCode.G7_AUTO_00100);
    }
  }

  @Override
  public void exportCustomers(HttpServletResponse response) {
    List<CustomerResponse> data = customerRepository.findAll().stream()
        .map(customerMapper::toResponse).toList();
    ExcelExportHelper.export(response, data, CustomerResponse.class, "DANH SÁCH KHÁCH HÀNG",
        "danh-sach-khach-hang");
  }

  private Customer get(Long id) {
    return customerRepository.findById(id)
        .orElseThrow(() -> NotFoundUtils.customerIdNotFound(id));
  }

  private String getCellString(Row row, int col) {
    Cell cell = row.getCell(col);
    if (cell == null) {
      return "";
    }
    return switch (cell.getCellType()) {
      case STRING -> cell.getStringCellValue().trim();
      case NUMERIC -> String.valueOf((long) cell.getNumericCellValue());
      default -> "";
    };
  }
}
