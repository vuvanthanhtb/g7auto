package com.g7auto.application.service;

import com.g7auto.application.dto.request.CarTransferRequest;
import com.g7auto.application.dto.request.CarTransferSearchRequest;
import com.g7auto.application.dto.response.CarTransferResponse;
import com.g7auto.core.response.PageResponse;
import jakarta.servlet.http.HttpServletResponse;

public interface CarTransferService {

  PageResponse<CarTransferResponse> search(CarTransferSearchRequest request);

  CarTransferResponse findById(Long id);

  CarTransferResponse create(CarTransferRequest request);

  CarTransferResponse confirmExport(Long id);

  CarTransferResponse confirmReceive(Long id);

  CarTransferResponse cancel(Long id, String reason);

  void exportCarTransfers(HttpServletResponse response);
}
