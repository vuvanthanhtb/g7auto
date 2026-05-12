package com.g7auto.application.service;

import com.g7auto.application.dto.request.TestDriveRequest;
import com.g7auto.application.dto.request.TestDriveSearchRequest;
import com.g7auto.application.dto.response.TestDriveResponse;
import com.g7auto.core.response.Page;
import jakarta.servlet.http.HttpServletResponse;

public interface TestDriveService {

  Page<TestDriveResponse> search(TestDriveSearchRequest request);

  TestDriveResponse findById(Long id);

  TestDriveResponse create(TestDriveRequest testDriveRequest);

  TestDriveResponse confirm(Long id);

  TestDriveResponse complete(Long id, String notes);

  TestDriveResponse cancel(Long id);

  void exportTestDrives(HttpServletResponse response);
}
