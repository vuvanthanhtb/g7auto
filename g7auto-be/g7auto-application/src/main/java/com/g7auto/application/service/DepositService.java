package com.g7auto.application.service;

import com.g7auto.application.dto.request.DepositRequest;
import com.g7auto.application.dto.request.DepositSearchRequest;
import com.g7auto.application.dto.response.ContractResponse;
import com.g7auto.application.dto.response.DepositResponse;
import com.g7auto.core.response.Page;
import jakarta.servlet.http.HttpServletResponse;
import java.time.LocalDate;
import java.util.List;

public interface DepositService {

  Page<DepositResponse> search(DepositSearchRequest request);

  List<DepositResponse> findAllList();

  DepositResponse findById(Long id);

  DepositResponse create(DepositRequest request);

  DepositResponse refund(Long id, String notes);

  DepositResponse cancel(Long id, String reason);

  ContractResponse convertToContract(Long depositId,
      LocalDate signDate, LocalDate expectedDeliveryDate, String notes);

  void exportDeposits(HttpServletResponse response);
}
