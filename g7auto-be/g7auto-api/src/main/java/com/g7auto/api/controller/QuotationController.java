package com.g7auto.api.controller;

import com.g7auto.application.dto.request.QuotationRequest;
import com.g7auto.application.dto.request.QuotationSearchRequest;
import com.g7auto.application.dto.response.QuotationResponse;
import com.g7auto.application.service.QuotationService;
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
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/quotations")
@RequiredArgsConstructor
public class QuotationController {

  private final QuotationService quotationService;

  @GetMapping
  public ResponseEntity<ApiResponse<PageResponse<QuotationResponse>>> search(
      @ModelAttribute QuotationSearchRequest request) {
    return ResponseEntity.ok(ApiResponse.ok(quotationService.search(request)));
  }

  @GetMapping("/{id}")
  public ResponseEntity<ApiResponse<QuotationResponse>> getById(@PathVariable Long id) {
    return ResponseEntity.ok(ApiResponse.ok(quotationService.findById(id)));
  }

  @PostMapping
  public ResponseEntity<ApiResponse<QuotationResponse>> create(@RequestBody QuotationRequest req) {
    return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.ok(quotationService.create(req)));
  }

  @PostMapping("/{id}/send")
  public ResponseEntity<ApiResponse<QuotationResponse>> send(@PathVariable Long id) {
    return ResponseEntity.ok(ApiResponse.ok(quotationService.send(id)));
  }

  @PostMapping("/{id}/accept")
  public ResponseEntity<ApiResponse<QuotationResponse>> accept(@PathVariable Long id) {
    return ResponseEntity.ok(ApiResponse.ok(quotationService.accept(id)));
  }

  @PostMapping("/{id}/cancel")
  public ResponseEntity<ApiResponse<QuotationResponse>> cancel(@PathVariable Long id) {
    return ResponseEntity.ok(ApiResponse.ok(quotationService.cancel(id)));
  }

  @GetMapping("/export")
  public void exportQuotations(HttpServletResponse response) {
    quotationService.exportQuotations(response);
  }
}
