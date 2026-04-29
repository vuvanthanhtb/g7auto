package com.g7auto.application.service;

import com.g7auto.application.dto.request.AccountSearchRequest;
import com.g7auto.application.dto.response.AccountResponse;
import com.g7auto.application.dto.response.ImportResult;
import com.g7auto.core.response.PageResponse;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.multipart.MultipartFile;

public interface AccountService {

  PageResponse<AccountResponse> search(AccountSearchRequest request);

  AccountResponse findById(Long id);

  void exportAccounts(HttpServletResponse response);

  ImportResult importAccounts(MultipartFile file);

  void downloadAccountTemplate(HttpServletResponse response);
}
