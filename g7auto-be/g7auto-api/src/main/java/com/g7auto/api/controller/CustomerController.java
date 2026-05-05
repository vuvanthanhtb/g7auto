package com.g7auto.api.controller;

import com.g7auto.application.dto.request.CustomerRequest;
import com.g7auto.application.dto.request.CustomerSearchRequest;
import com.g7auto.application.dto.response.CustomerResponse;
import com.g7auto.application.dto.response.ImportResult;
import com.g7auto.application.service.CustomerService;
import com.g7auto.core.response.ApiResponse;
import com.g7auto.core.response.PageResponse;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/customers")
@RequiredArgsConstructor
public class CustomerController {

  private final CustomerService customerService;

  @GetMapping
  public ResponseEntity<ApiResponse<PageResponse<CustomerResponse>>> search(
      @ModelAttribute CustomerSearchRequest request) {
    return ResponseEntity.ok(ApiResponse.ok(customerService.search(request)));
  }

  @GetMapping("/{id}")
  public ResponseEntity<ApiResponse<CustomerResponse>> getById(@PathVariable Long id) {
    return ResponseEntity.ok(ApiResponse.ok(customerService.findById(id)));
  }

  @PostMapping
  public ResponseEntity<ApiResponse<CustomerResponse>> create(@RequestBody CustomerRequest req) {
    return ResponseEntity.status(HttpStatus.CREATED)
        .body(ApiResponse.ok(customerService.create(req)));
  }

  @PutMapping("/{id}")
  public ResponseEntity<ApiResponse<CustomerResponse>> update(@PathVariable Long id,
      @RequestBody CustomerRequest req) {
    return ResponseEntity.ok(ApiResponse.ok(customerService.update(id, req)));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
    customerService.delete(id);
    return ResponseEntity.ok(ApiResponse.ok(null));
  }

  @PostMapping("/import")
  public ResponseEntity<ApiResponse<ImportResult>> importCustomers(
      @RequestParam("file") MultipartFile file) {
    return ResponseEntity.ok(ApiResponse.ok(customerService.importCustomers(file)));
  }

  @GetMapping("/template")
  public void downloadTemplate(HttpServletResponse response) {
    customerService.downloadCustomerTemplate(response);
  }
}
