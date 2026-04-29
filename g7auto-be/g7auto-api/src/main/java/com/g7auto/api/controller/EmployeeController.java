package com.g7auto.api.controller;

import com.g7auto.application.dto.request.EmployeeRequest;
import com.g7auto.application.dto.request.EmployeeSearchRequest;
import com.g7auto.application.dto.response.EmployeeResponse;
import com.g7auto.application.service.EmployeeService;
import com.g7auto.core.response.ApiResponse;
import com.g7auto.core.response.PageResponse;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/employees")
@RequiredArgsConstructor
public class EmployeeController {

  private final EmployeeService employeeService;

  @GetMapping
  public ResponseEntity<ApiResponse<PageResponse<EmployeeResponse>>> search(
      @ModelAttribute EmployeeSearchRequest request) {
    return ResponseEntity.ok(ApiResponse.ok(employeeService.search(request)));
  }

  @GetMapping("/{id}")
  public ResponseEntity<ApiResponse<EmployeeResponse>> getById(@PathVariable Long id) {
    return ResponseEntity.ok(ApiResponse.ok(employeeService.findById(id)));
  }

  @PostMapping
  public ResponseEntity<ApiResponse<EmployeeResponse>> create(@RequestBody EmployeeRequest req) {
    return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.ok(employeeService.create(req)));
  }

  @PutMapping("/{id}")
  public ResponseEntity<ApiResponse<EmployeeResponse>> update(@PathVariable Long id,
      @RequestBody EmployeeRequest req) {
    return ResponseEntity.ok(ApiResponse.ok(employeeService.update(id, req)));
  }

  @PostMapping("/{id}/resign")
  public ResponseEntity<ApiResponse<EmployeeResponse>> resign(@PathVariable Long id) {
    return ResponseEntity.ok(ApiResponse.ok(employeeService.resign(id)));
  }

  @PostMapping("/{id}/transfer-showroom")
  public ResponseEntity<ApiResponse<EmployeeResponse>> transferShowroom(@PathVariable Long id,
      @RequestParam Long newShowroomId) {
    return ResponseEntity.ok(ApiResponse.ok(employeeService.transferShowroom(id, newShowroomId)));
  }

  @GetMapping("/export")
  public void exportEmployees(HttpServletResponse response) {
    employeeService.exportEmployees(response);
  }
}
