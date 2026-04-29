package com.g7auto.application.service;

import com.g7auto.application.dto.request.CustomerRequest;
import com.g7auto.application.dto.request.CustomerSearchRequest;
import com.g7auto.application.dto.response.CustomerResponse;
import com.g7auto.application.dto.response.ImportResult;
import com.g7auto.core.response.PageResponse;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.multipart.MultipartFile;

public interface CustomerService {

  PageResponse<CustomerResponse> search(CustomerSearchRequest request);

  CustomerResponse findById(Long id);

  CustomerResponse create(CustomerRequest customerRequest);

  CustomerResponse update(Long id, CustomerRequest customerRequest);

  void delete(Long id);

  ImportResult importCustomers(MultipartFile file);

  void downloadCustomerTemplate(HttpServletResponse response);

  void exportCustomers(HttpServletResponse response);
}
