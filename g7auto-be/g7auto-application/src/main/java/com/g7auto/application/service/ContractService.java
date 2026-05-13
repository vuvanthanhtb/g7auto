package com.g7auto.application.service;

import com.g7auto.application.dto.request.ContractRequest;
import com.g7auto.application.dto.request.ContractSearchRequest;
import com.g7auto.application.dto.request.ContractUpdateRequest;
import com.g7auto.application.dto.response.ContractResponse;
import com.g7auto.core.response.Page;
import jakarta.servlet.http.HttpServletResponse;
import java.util.List;

public interface ContractService {

  Page<ContractResponse> search(ContractSearchRequest request);

  List<ContractResponse> findAllList();

  ContractResponse findById(Long id);

  ContractResponse create(ContractRequest contractRequest);

  ContractResponse update(Long id, ContractUpdateRequest contractUpdateRequest);

  void delete(Long id);

  void exportContracts(HttpServletResponse response);
}
