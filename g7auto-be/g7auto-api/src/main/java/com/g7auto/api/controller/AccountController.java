package com.g7auto.api.controller;

import com.g7auto.application.dto.request.AccountSearchRequest;
import com.g7auto.application.dto.response.AccountResponse;
import com.g7auto.application.dto.response.ImportResult;
import com.g7auto.application.service.AccountService;
import com.g7auto.core.response.ApiResponse;
import com.g7auto.core.response.PageResponse;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/accounts")
@RequiredArgsConstructor
public class AccountController {

  private final AccountService accountService;

  @GetMapping("/search")
  public ResponseEntity<ApiResponse<PageResponse<AccountResponse>>> search(
      @ModelAttribute
      AccountSearchRequest request) {
    return ResponseEntity.ok(ApiResponse.ok(accountService.search(request)));
  }

  @GetMapping("/{id}")
  public ResponseEntity<ApiResponse<AccountResponse>> getById(
      @PathVariable Long id) {
    return ResponseEntity.ok(ApiResponse.ok(accountService.findById(id)));
  }

  @GetMapping("/export")
  public void exportAccounts(HttpServletResponse response) {
    accountService.exportAccounts(response);
  }

  @PostMapping("/import")
  public ResponseEntity<ApiResponse<ImportResult>> importAccounts(
      @RequestParam("file") MultipartFile file) {
    return ResponseEntity.ok(ApiResponse.ok(accountService.importAccounts(file)));
  }

  @GetMapping("/template")
  public void downloadTemplate(HttpServletResponse response) {
    accountService.downloadAccountTemplate(response);
  }
}
