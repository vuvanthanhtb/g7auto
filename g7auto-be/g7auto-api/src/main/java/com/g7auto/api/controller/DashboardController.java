package com.g7auto.api.controller;

import com.g7auto.application.dto.response.DashboardStatsResponse;
import com.g7auto.application.service.DashboardService;
import com.g7auto.core.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

  private final DashboardService dashboardService;

  @GetMapping("/stats")
  public ResponseEntity<ApiResponse<DashboardStatsResponse>> getStats() {
    return ResponseEntity.ok(ApiResponse.ok(dashboardService.getStats()));
  }
}
