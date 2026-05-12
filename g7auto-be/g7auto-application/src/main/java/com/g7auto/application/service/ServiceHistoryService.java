package com.g7auto.application.service;

import com.g7auto.application.dto.request.ServiceHistoryRequest;
import com.g7auto.application.dto.request.ServiceHistorySearchRequest;
import com.g7auto.application.dto.response.ServiceHistoryResponse;
import com.g7auto.core.response.Page;
import jakarta.servlet.http.HttpServletResponse;

public interface ServiceHistoryService {

  Page<ServiceHistoryResponse> search(ServiceHistorySearchRequest request);

  ServiceHistoryResponse findById(Long id);

  ServiceHistoryResponse create(ServiceHistoryRequest request);

  void exportServiceHistory(HttpServletResponse response);
}
