package com.g7auto.application.service;

import com.g7auto.application.dto.request.AccountApprovingSearchRequest;
import com.g7auto.application.dto.request.StatusRequest;
import com.g7auto.application.dto.response.AccountApprovingResponse;
import com.g7auto.core.response.PageResponse;

public interface AccountApprovingService {

  PageResponse<AccountApprovingResponse> search(AccountApprovingSearchRequest request);

  PageResponse<AccountApprovingResponse> searchPendingAccounts(
      AccountApprovingSearchRequest request);

  PageResponse<AccountApprovingResponse> searchApprovedAccounts(
      AccountApprovingSearchRequest request);

  String requestAccountStatusChange(StatusRequest request);

  String requestApproval(StatusRequest request);
}
