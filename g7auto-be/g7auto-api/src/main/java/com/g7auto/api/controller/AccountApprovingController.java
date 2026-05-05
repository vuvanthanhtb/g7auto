package com.g7auto.api.controller;

import com.g7auto.application.dto.request.AccountApprovingSearchRequest;
import com.g7auto.application.dto.request.StatusRequest;
import com.g7auto.application.dto.response.AccountApprovingResponse;
import com.g7auto.application.service.AccountApprovingService;
import com.g7auto.core.response.ApiResponse;
import com.g7auto.core.response.PageResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/accounts_approving")
@RequiredArgsConstructor
public class AccountApprovingController {

  private final AccountApprovingService accountApprovingService;

  @GetMapping("/search")
  public ResponseEntity<ApiResponse<PageResponse<AccountApprovingResponse>>> search(
      @ModelAttribute AccountApprovingSearchRequest request) {
    return ResponseEntity.ok(ApiResponse.ok(accountApprovingService.search(request)));
  }

  @GetMapping("/search-pending")
  public ResponseEntity<ApiResponse<PageResponse<AccountApprovingResponse>>> searchPendingAccounts(
      @ModelAttribute AccountApprovingSearchRequest request) {
    return ResponseEntity.ok(
        ApiResponse.ok(accountApprovingService.searchPendingAccounts(request)));
  }

  @GetMapping("/search-approved")
  public ResponseEntity<ApiResponse<PageResponse<AccountApprovingResponse>>> searchApprovedAccounts(
      @ModelAttribute AccountApprovingSearchRequest request) {
    return ResponseEntity.ok(
        ApiResponse.ok(accountApprovingService.searchApprovedAccounts(request)));
  }

  @PostMapping("/request-approval")
  public ResponseEntity<ApiResponse<Void>> requestApproval(@RequestBody StatusRequest request) {
    return ResponseEntity.ok(
        ApiResponse.ok(accountApprovingService.requestApproval(request)));
  }

  @PostMapping("/request-change-status")
  public ResponseEntity<ApiResponse<Void>> requestChangeStatus(@RequestBody StatusRequest request) {
    return ResponseEntity.ok(
        ApiResponse.ok(accountApprovingService.requestAccountStatusChange(request)));
  }
}
