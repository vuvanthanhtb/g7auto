package com.g7auto.application.service;

import com.g7auto.application.dto.request.EmployeeSearchRequest;
import com.g7auto.application.dto.response.EmployeeResponse;
import com.g7auto.core.response.PageResponse;
import jakarta.servlet.http.HttpServletResponse;
import java.util.List;

public interface EmployeeService {

  PageResponse<EmployeeResponse> search(EmployeeSearchRequest request);

  EmployeeResponse findById(Long id);

  List<EmployeeResponse> findAllList();

  EmployeeResponse resign(Long id);

  EmployeeResponse transferShowroom(Long id, Long newShowroomId);

  void exportEmployees(HttpServletResponse response);
}
