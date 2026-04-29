package com.g7auto.application.service;

import com.g7auto.application.dto.request.EmployeeRequest;
import com.g7auto.application.dto.request.EmployeeSearchRequest;
import com.g7auto.application.dto.response.EmployeeResponse;
import com.g7auto.core.response.PageResponse;
import jakarta.servlet.http.HttpServletResponse;

public interface EmployeeService {

  PageResponse<EmployeeResponse> search(EmployeeSearchRequest request);

  EmployeeResponse findById(Long id);

  EmployeeResponse create(EmployeeRequest request);

  EmployeeResponse update(Long id, EmployeeRequest request);

  EmployeeResponse resign(Long id);

  EmployeeResponse transferShowroom(Long id, Long newShowroomId);

  void exportEmployees(HttpServletResponse response);
}
