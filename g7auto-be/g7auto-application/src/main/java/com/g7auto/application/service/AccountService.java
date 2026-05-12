package com.g7auto.application.service;

import com.g7auto.application.dto.request.AccountSearchRequest;
import com.g7auto.application.dto.response.AccountResponse;
import com.g7auto.core.response.Page;
import jakarta.servlet.http.HttpServletResponse;

public interface AccountService {

  Page<AccountResponse> search(AccountSearchRequest request);

  AccountResponse findById(Long id);

  void exportAccounts(HttpServletResponse response);
}
