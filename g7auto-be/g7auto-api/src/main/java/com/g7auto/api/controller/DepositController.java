package com.g7auto.api.controller;

import com.g7auto.application.dto.request.DepositRequest;
import com.g7auto.application.dto.request.DepositSearchRequest;
import com.g7auto.application.dto.response.ContractResponse;
import com.g7auto.application.dto.response.DepositResponse;
import com.g7auto.application.service.DepositService;
import com.g7auto.core.response.ApiResponse;
import com.g7auto.core.response.PageResponse;
import jakarta.servlet.http.HttpServletResponse;
import java.time.LocalDate;
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
@RequestMapping("/api/deposits")
@RequiredArgsConstructor
public class DepositController {

  private final DepositService depositService;

  @GetMapping
  public ResponseEntity<ApiResponse<PageResponse<DepositResponse>>> search(
      @ModelAttribute DepositSearchRequest request) {
    return ResponseEntity.ok(ApiResponse.ok(depositService.search(request)));
  }

  @GetMapping("/{id}")
  public ResponseEntity<ApiResponse<DepositResponse>> getById(@PathVariable Long id) {
    return ResponseEntity.ok(ApiResponse.ok(depositService.findById(id)));
  }

  @PostMapping
  public ResponseEntity<ApiResponse<DepositResponse>> create(@RequestBody DepositRequest req) {
    return ResponseEntity.status(HttpStatus.CREATED)
        .body(ApiResponse.ok(depositService.create(req)));
  }

  @PostMapping("/{id}/refund")
  public ResponseEntity<ApiResponse<DepositResponse>> refund(@PathVariable Long id,
      @RequestParam(required = false) String notes) {
    return ResponseEntity.ok(ApiResponse.ok(depositService.refund(id, notes)));
  }

  @PostMapping("/{id}/cancel")
  public ResponseEntity<ApiResponse<DepositResponse>> cancel(@PathVariable Long id,
      @RequestParam(required = false) String reason) {
    return ResponseEntity.ok(ApiResponse.ok(depositService.cancel(id, reason)));
  }

  @PostMapping("/{id}/convert-to-contract")
  public ResponseEntity<ApiResponse<ContractResponse>> convertToContract(@PathVariable Long id,
      @RequestParam String contractNumber,
      @RequestParam(required = false) String signDate,
      @RequestParam(required = false) String expectedDeliveryDate,
      @RequestParam(required = false) String notes) {
    return ResponseEntity.ok(ApiResponse.ok(depositService.convertToContract(
        id, contractNumber,
        signDate != null ? LocalDate.parse(signDate) : null,
        expectedDeliveryDate != null ? LocalDate.parse(expectedDeliveryDate) : null,
        notes)));
  }

  @GetMapping("/export")
  public void exportDeposits(HttpServletResponse response) {
    depositService.exportDeposits(response);
  }
}
