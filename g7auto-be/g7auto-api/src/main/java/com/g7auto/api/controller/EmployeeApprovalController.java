package com.g7auto.api.controller;

import com.g7auto.application.dto.request.BulkStatusRequest;
import com.g7auto.application.dto.request.EmployeeApprovalSearchRequest;
import com.g7auto.application.dto.request.EmployeeRequest;
import com.g7auto.application.dto.request.StatusRequest;
import com.g7auto.application.dto.response.EmployeeResponse;
import com.g7auto.application.dto.response.ImportResult;
import com.g7auto.application.service.EmployeeApprovalService;
import com.g7auto.core.response.ApiResponse;
import com.g7auto.core.response.Page;
import jakarta.servlet.http.HttpServletResponse;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/employees-approving")
@RequiredArgsConstructor
public class EmployeeApprovalController {

  private final EmployeeApprovalService employeeApprovalService;

  @GetMapping
  public ResponseEntity<ApiResponse<Page<EmployeeResponse>>> search(
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

  @PostMapping("/bulk-approval")
  public ResponseEntity<ApiResponse<Void>> bulkApproval(@RequestBody BulkStatusRequest request) {
    return ResponseEntity.ok(
        ApiResponse.ok(employeeApprovalService.bulkRequestApproval(request)));
  }

  @PostMapping("/import")
  public ResponseEntity<ApiResponse<ImportResult>> importEmployees(
      @RequestParam("file") MultipartFile file) {
    return ResponseEntity.ok(ApiResponse.ok(employeeApprovalService.importEmployeeApprovals(file)));
  }

  @GetMapping("/template")
  public void downloadTemplate(HttpServletResponse response) {
    employeeApprovalService.downloadEmployeeApprovalTemplate(response);
  }
}
