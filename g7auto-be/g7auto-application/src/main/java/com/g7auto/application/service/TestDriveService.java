package com.g7auto.application.service;

import com.g7auto.application.dto.request.TestDriveRequest;
import com.g7auto.application.dto.request.TestDriveSearchRequest;
import com.g7auto.application.dto.response.TestDriveResponse;
import com.g7auto.core.response.PageResponse;
import jakarta.servlet.http.HttpServletResponse;

public interface TestDriveService {

  PageResponse<TestDriveResponse> search(TestDriveSearchRequest request);

  TestDriveResponse findById(Long id);

  TestDriveResponse create(TestDriveRequest testDriveRequest);

  TestDriveResponse confirm(Long id);

  TestDriveResponse complete(Long id, String notes);

  TestDriveResponse cancel(Long id);

  void exportTestDrives(HttpServletResponse response);
}
