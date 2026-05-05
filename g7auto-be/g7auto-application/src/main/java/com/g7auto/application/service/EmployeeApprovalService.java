package com.g7auto.application.service;

import com.g7auto.application.dto.request.EmployeeApprovalSearchRequest;
import com.g7auto.application.dto.request.EmployeeRequest;
import com.g7auto.application.dto.request.StatusRequest;
import com.g7auto.application.dto.response.EmployeeResponse;
import com.g7auto.core.response.PageResponse;

public interface EmployeeApprovalService {

  PageResponse<EmployeeResponse> search(EmployeeApprovalSearchRequest request);

  String create(EmployeeRequest request);

  String update(Long id, EmployeeRequest request);

  String delete(Long id);

  String requestApproval(StatusRequest request);
}
