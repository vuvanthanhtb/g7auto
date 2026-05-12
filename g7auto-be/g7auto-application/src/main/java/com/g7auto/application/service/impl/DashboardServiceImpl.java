package com.g7auto.application.service.impl;

import com.g7auto.application.dto.response.DashboardStatsResponse;
import com.g7auto.application.service.DashboardService;
import com.g7auto.infrastructure.persistence.postgresql.CarRepository;
import com.g7auto.infrastructure.persistence.postgresql.ContractRepository;
import com.g7auto.infrastructure.persistence.postgresql.CustomerRepository;
import com.g7auto.infrastructure.persistence.postgresql.DepositRepository;
import com.g7auto.infrastructure.persistence.postgresql.QuotationRepository;
import com.g7auto.infrastructure.persistence.postgresql.ShowroomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DashboardServiceImpl implements DashboardService {

  private final CarRepository carRepository;
  private final CustomerRepository customerRepository;
  private final ContractRepository contractRepository;
  private final ShowroomRepository showroomRepository;
  private final DepositRepository depositRepository;
  private final QuotationRepository quotationRepository;

  @Override
  public DashboardStatsResponse getStats() {
    return new DashboardStatsResponse(
        carRepository.count(),
        customerRepository.count(),
        contractRepository.count(),
        showroomRepository.count(),
        depositRepository.count(),
        quotationRepository.count()
    );
  }
}
