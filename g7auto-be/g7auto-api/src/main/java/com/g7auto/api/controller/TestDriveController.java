package com.g7auto.api.controller;

import com.g7auto.application.dto.request.TestDriveRequest;
import com.g7auto.application.dto.request.TestDriveSearchRequest;
import com.g7auto.application.dto.response.TestDriveResponse;
import com.g7auto.application.service.TestDriveService;
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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/test-drives")
@RequiredArgsConstructor
public class TestDriveController {

  private final TestDriveService testDriveService;

  @GetMapping
  public ResponseEntity<ApiResponse<PageResponse<TestDriveResponse>>> search(
      @ModelAttribute TestDriveSearchRequest request) {
    return ResponseEntity.ok(ApiResponse.ok(testDriveService.search(request)));
  }

  @GetMapping("/{id}")
  public ResponseEntity<ApiResponse<TestDriveResponse>> getById(@PathVariable Long id) {
    return ResponseEntity.ok(ApiResponse.ok(testDriveService.findById(id)));
  }

  @PostMapping
  public ResponseEntity<ApiResponse<TestDriveResponse>> create(@RequestBody TestDriveRequest req) {
    return ResponseEntity.status(HttpStatus.CREATED)
        .body(ApiResponse.ok(testDriveService.create(req)));
  }

  @PostMapping("/{id}/confirm")
  public ResponseEntity<ApiResponse<TestDriveResponse>> confirm(@PathVariable Long id) {
    return ResponseEntity.ok(ApiResponse.ok(testDriveService.confirm(id)));
  }

  @PostMapping("/{id}/complete")
  public ResponseEntity<ApiResponse<TestDriveResponse>> complete(@PathVariable Long id,
      @RequestParam(required = false) String notes) {
    return ResponseEntity.ok(ApiResponse.ok(testDriveService.complete(id, notes)));
  }

  @PostMapping("/{id}/cancel")
  public ResponseEntity<ApiResponse<TestDriveResponse>> cancel(@PathVariable Long id) {
    return ResponseEntity.ok(ApiResponse.ok(testDriveService.cancel(id)));
  }

  @GetMapping("/export")
  public void exportTestDrives(HttpServletResponse response) {
    testDriveService.exportTestDrives(response);
  }
}
