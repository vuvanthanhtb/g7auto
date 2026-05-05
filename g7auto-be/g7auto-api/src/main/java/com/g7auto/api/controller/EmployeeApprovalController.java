package com.g7auto.api.controller;

import com.g7auto.application.dto.request.EmployeeApprovalSearchRequest;
import com.g7auto.application.dto.request.EmployeeRequest;
import com.g7auto.application.dto.request.StatusRequest;
import com.g7auto.application.dto.response.EmployeeResponse;
import com.g7auto.application.service.EmployeeApprovalService;
import com.g7auto.core.response.ApiResponse;
import com.g7auto.core.response.PageResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/employees-approving")
@RequiredArgsConstructor
public class EmployeeApprovalController {

  private final EmployeeApprovalService employeeApprovalService;

  @GetMapping
  public ResponseEntity<ApiResponse<PageResponse<EmployeeResponse>>> search(
      @ModelAttribute EmployeeApprovalSearchRequest request) {
    return ResponseEntity.ok(ApiResponse.ok(employeeApprovalService.search(request)));
  }

  @PostMapping
  public ResponseEntity<ApiResponse<Void>> create(@RequestBody EmployeeRequest request) {
    return ResponseEntity.ok(ApiResponse.ok(employeeApprovalService.create(request)));
  }

  @PutMapping("/{id}")
  public ResponseEntity<ApiResponse<Void>> update(@PathVariable Long id,
      @RequestBody EmployeeRequest request) {
    return ResponseEntity.ok(ApiResponse.ok(employeeApprovalService.update(id, request)));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
    return ResponseEntity.ok(ApiResponse.ok(employeeApprovalService.delete(id)));
  }

  @PostMapping("/request-approval")
  public ResponseEntity<ApiResponse<Void>> requestApproval(@RequestBody StatusRequest request) {
    return ResponseEntity.ok(
        ApiResponse.ok(employeeApprovalService.requestApproval(request)));
  }
}
