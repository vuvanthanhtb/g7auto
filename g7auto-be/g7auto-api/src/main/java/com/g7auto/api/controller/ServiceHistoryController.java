package com.g7auto.api.controller;

import com.g7auto.application.dto.request.ServiceHistoryRequest;
import com.g7auto.application.dto.request.ServiceHistorySearchRequest;
import com.g7auto.application.dto.response.ServiceHistoryResponse;
import com.g7auto.application.service.ServiceHistoryService;
import com.g7auto.core.response.ApiResponse;
import com.g7auto.core.response.PageResponse;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/service-histories")
@RequiredArgsConstructor
public class ServiceHistoryController {

  private final ServiceHistoryService serviceHistoryService;

  @GetMapping("/customer/{customerId}")
  public ResponseEntity<ApiResponse<PageResponse<ServiceHistoryResponse>>> getByCustomer(
      @ModelAttribute
      ServiceHistorySearchRequest request) {
    return ResponseEntity.ok(
        ApiResponse.ok(serviceHistoryService.findByCustomer(request)));
  }

  @PostMapping
  public ResponseEntity<ApiResponse<ServiceHistoryResponse>> create(
      @RequestBody ServiceHistoryRequest req) {
    return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.ok(
        serviceHistoryService.create(req)));
  }

  @GetMapping("/export")
  public void exportServiceHistory(HttpServletResponse response) {
    serviceHistoryService.exportServiceHistory(response);
  }
}
