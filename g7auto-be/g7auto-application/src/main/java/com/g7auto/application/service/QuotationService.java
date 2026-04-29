package com.g7auto.application.service;

import com.g7auto.application.dto.request.QuotationRequest;
import com.g7auto.application.dto.request.QuotationSearchRequest;
import com.g7auto.application.dto.response.QuotationResponse;
import com.g7auto.core.response.PageResponse;
import jakarta.servlet.http.HttpServletResponse;

public interface QuotationService {

  PageResponse<QuotationResponse> search(QuotationSearchRequest request);

  QuotationResponse findById(Long id);

  QuotationResponse create(QuotationRequest request);

  QuotationResponse send(Long id);

  QuotationResponse accept(Long id);

  QuotationResponse cancel(Long id);

  void exportQuotations(HttpServletResponse response);
}
