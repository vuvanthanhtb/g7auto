package com.g7auto.api.controller;

import com.g7auto.application.dto.request.CarTransferRequest;
import com.g7auto.application.dto.request.CarTransferSearchRequest;
import com.g7auto.application.dto.response.CarTransferResponse;
import com.g7auto.application.service.CarTransferService;
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
@RequestMapping("/api/car-transfers")
@RequiredArgsConstructor
public class CarTransferController {

  private final CarTransferService carTransferService;

  @GetMapping
  public ResponseEntity<ApiResponse<PageResponse<CarTransferResponse>>> search(
      @ModelAttribute CarTransferSearchRequest request) {
    return ResponseEntity.ok(ApiResponse.ok(carTransferService.search(request)));
  }

  @GetMapping("/{id}")
  public ResponseEntity<ApiResponse<CarTransferResponse>> getById(@PathVariable Long id) {
    return ResponseEntity.ok(ApiResponse.ok(carTransferService.findById(id)));
  }

  @PostMapping
  public ResponseEntity<ApiResponse<CarTransferResponse>> create(@RequestBody CarTransferRequest req) {
    return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.ok(carTransferService.create(req)));
  }

  @PostMapping("/{id}/confirm-export")
  public ResponseEntity<ApiResponse<CarTransferResponse>> confirmExport(@PathVariable Long id) {
    return ResponseEntity.ok(ApiResponse.ok(carTransferService.confirmExport(id)));
  }

  @PostMapping("/{id}/confirm-receive")
  public ResponseEntity<ApiResponse<CarTransferResponse>> confirmReceive(@PathVariable Long id) {
    return ResponseEntity.ok(ApiResponse.ok(carTransferService.confirmReceive(id)));
  }

  @PostMapping("/{id}/cancel")
  public ResponseEntity<ApiResponse<CarTransferResponse>> cancel(@PathVariable Long id,
      @RequestParam(required = false) String reason) {
    return ResponseEntity.ok(ApiResponse.ok(carTransferService.cancel(id, reason)));
  }

  @GetMapping("/export")
  public void exportCarTransfers(HttpServletResponse response) {
    carTransferService.exportCarTransfers(response);
  }
}
