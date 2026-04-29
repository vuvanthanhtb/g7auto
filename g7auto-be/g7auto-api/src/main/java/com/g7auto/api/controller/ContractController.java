package com.g7auto.api.controller;

import com.g7auto.application.dto.request.ContractRequest;
import com.g7auto.application.dto.request.ContractSearchRequest;
import com.g7auto.application.dto.request.ContractUpdateRequest;
import com.g7auto.application.dto.response.ContractResponse;
import com.g7auto.application.service.ContractService;
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
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/contracts")
@RequiredArgsConstructor
public class ContractController {

  private final ContractService contractService;

  @GetMapping
  public ResponseEntity<ApiResponse<PageResponse<ContractResponse>>> search(
      @ModelAttribute ContractSearchRequest request) {
    return ResponseEntity.ok(ApiResponse.ok(contractService.search(request)));
  }

  @GetMapping("/{id}")
  public ResponseEntity<ApiResponse<ContractResponse>> getById(@PathVariable Long id) {
    return ResponseEntity.ok(ApiResponse.ok(contractService.findById(id)));
  }

  @PostMapping
  public ResponseEntity<ApiResponse<ContractResponse>> create(@RequestBody ContractRequest req) {
    return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.ok(contractService.create(req)));
  }

  @PutMapping("/{id}")
  public ResponseEntity<ApiResponse<ContractResponse>> update(@PathVariable Long id,
      @RequestBody ContractUpdateRequest req) {
    return ResponseEntity.ok(ApiResponse.ok(contractService.update(id, req)));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
    contractService.delete(id);
    return ResponseEntity.ok(ApiResponse.ok(null));
  }

  @GetMapping("/export")
  public void exportContracts(HttpServletResponse response) {
    contractService.exportContracts(response);
  }
}
