package com.g7auto.application.service;

import com.g7auto.application.dto.request.DepositRequest;
import com.g7auto.application.dto.request.DepositSearchRequest;
import com.g7auto.application.dto.response.ContractResponse;
import com.g7auto.application.dto.response.DepositResponse;
import com.g7auto.core.response.PageResponse;
import jakarta.servlet.http.HttpServletResponse;
import java.time.LocalDate;

public interface DepositService {

  PageResponse<DepositResponse> search(DepositSearchRequest request);

  DepositResponse findById(Long id);

  DepositResponse create(DepositRequest request);

  DepositResponse refund(Long id, String notes);

  DepositResponse cancel(Long id, String reason);

  ContractResponse convertToContract(Long depositId, String contractNumber,
      LocalDate signDate, LocalDate expectedDeliveryDate, String notes);

  void exportDeposits(HttpServletResponse response);
}
