package com.g7auto.application.dto.response;

public record DashboardStatsResponse(
    long totalCars,
    long totalCustomers,
    long totalContracts,
    long totalShowrooms,
    long totalDeposits,
    long totalQuotations
) {

}
