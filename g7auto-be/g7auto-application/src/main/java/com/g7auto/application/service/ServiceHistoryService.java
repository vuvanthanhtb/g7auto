package com.g7auto.application.service;

import com.g7auto.application.dto.request.ServiceHistoryRequest;
import com.g7auto.application.dto.request.ServiceHistorySearchRequest;
import com.g7auto.application.dto.response.ServiceHistoryResponse;
import com.g7auto.core.response.PageResponse;
import jakarta.servlet.http.HttpServletResponse;

public interface ServiceHistoryService {

  PageResponse<ServiceHistoryResponse> search(ServiceHistorySearchRequest request);

  ServiceHistoryResponse findById(Long id);

  ServiceHistoryResponse create(ServiceHistoryRequest request);

  void exportServiceHistory(HttpServletResponse response);
}
