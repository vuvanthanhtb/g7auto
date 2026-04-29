package com.g7auto.api.controller;

import com.g7auto.application.dto.request.PaymentRequest;
import com.g7auto.application.dto.response.PaymentResponse;
import com.g7auto.application.service.PaymentService;
import com.g7auto.core.response.ApiResponse;
import jakarta.servlet.http.HttpServletResponse;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentController {

  private final PaymentService paymentService;

  @GetMapping("/contract/{contractId}")
  public ResponseEntity<ApiResponse<List<PaymentResponse>>> getByContract(
      @PathVariable Long contractId) {
    return ResponseEntity.ok(
        ApiResponse.ok(paymentService.findByContract(contractId)));
  }

  @GetMapping("/{id}")
  public ResponseEntity<ApiResponse<PaymentResponse>> getById(
      @PathVariable Long id) {
    return ResponseEntity.ok(ApiResponse.ok(paymentService.findById(id)));
  }

  @PostMapping
  public ResponseEntity<ApiResponse<PaymentResponse>> create(
      @RequestBody PaymentRequest req) {
    return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.ok(
        paymentService.create(req)));
  }

  @PostMapping("/{id}/confirm")
  public ResponseEntity<ApiResponse<PaymentResponse>> confirm(
      @PathVariable Long id) {
    return ResponseEntity.ok(ApiResponse.ok(paymentService.confirm(id)));
  }

  @PostMapping("/{id}/cancel")
  public ResponseEntity<ApiResponse<PaymentResponse>> cancel(
      @PathVariable Long id) {
    return ResponseEntity.ok(ApiResponse.ok(paymentService.cancel(id)));
  }

  @GetMapping("/export")
  public void exportPayments(HttpServletResponse response) {
    paymentService.exportPayments(response);
  }
}
