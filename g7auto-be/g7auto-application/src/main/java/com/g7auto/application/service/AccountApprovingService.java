package com.g7auto.application.service;

import com.g7auto.application.dto.request.AccountApprovingSearchRequest;
import com.g7auto.application.dto.request.StatusRequest;
import com.g7auto.application.dto.response.AccountApprovingResponse;
import com.g7auto.core.response.Page;

public interface AccountApprovingService {

  Page<AccountApprovingResponse> search(AccountApprovingSearchRequest request);

  Page<AccountApprovingResponse> searchPendingAccounts(
      AccountApprovingSearchRequest request);

  Page<AccountApprovingResponse> searchApprovedAccounts(
      AccountApprovingSearchRequest request);

  String requestAccountStatusChange(StatusRequest request);

  String requestApproval(StatusRequest request);
}
