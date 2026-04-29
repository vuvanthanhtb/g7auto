package com.g7auto.application.service.impl;

import com.g7auto.application.dto.request.ServiceHistoryRequest;
import com.g7auto.application.dto.request.ServiceHistorySearchRequest;
import com.g7auto.application.dto.response.ServiceHistoryResponse;
import com.g7auto.application.mapper.ServiceHistoryMapper;
import com.g7auto.application.service.ServiceHistoryService;
import com.g7auto.core.exception.BadRequestException;
import com.g7auto.core.exception.NotFoundUtils;
import com.g7auto.core.export.ExcelExportHelper;
import com.g7auto.core.response.PageResponse;
import com.g7auto.core.utils.PageableUtils;
import jakarta.servlet.http.HttpServletResponse;
import com.g7auto.domain.entity.Customer;
import com.g7auto.domain.entity.ServiceHistory;
import com.g7auto.infrastructure.persistence.CustomerRepository;
import com.g7auto.infrastructure.persistence.EmployeeRepository;
import com.g7auto.infrastructure.persistence.ServiceHistoryRepository;
import com.g7auto.infrastructure.persistence.query.ServiceHistoryQueryRepository;
import java.time.LocalDateTime;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@RequiredArgsConstructor
public class ServiceHistoryServiceImpl implements ServiceHistoryService {

  private static final List<String> VALID_CONTACT_TYPES = List.of("CALL",
      "EMAIL", "VISIT");
  private final ServiceHistoryRepository serviceHistoryRepository;
  private final ServiceHistoryQueryRepository serviceHistoryQueryRepository;
  private final CustomerRepository customerRepository;
  private final EmployeeRepository employeeRepository;
  private final ServiceHistoryMapper serviceHistoryMapper;

  @Override
  public PageResponse<ServiceHistoryResponse> findByCustomer(
      ServiceHistorySearchRequest request) {
    Pageable pageable = PageableUtils.from(request);
    return PageResponse.of(
        serviceHistoryQueryRepository.search(
            request.getCustomerId(), request.getFromDate(), request.getToDate(), pageable),
        serviceHistoryMapper::toResponse,
        request.getFromDate(), request.getToDate());
  }

  @Override
  @Transactional
  public ServiceHistoryResponse create(ServiceHistoryRequest request) {
    if (!VALID_CONTACT_TYPES.contains(request.getContactType())) {
      throw new BadRequestException(
          "Invalid contact type. Must be one of: CALL, EMAIL, VISIT");
    }

    Long customerId = request.getCustomerId();
    Customer customer = customerRepository.findById(customerId)
        .orElseThrow(() -> NotFoundUtils.customerIdNotFound((customerId)));

    ServiceHistory history = serviceHistoryMapper.toEntity(request);
    history.setCustomer(customer);
    if (request.getEmployeeId() != null) {
      history.setEmployee(
          employeeRepository.findById(request.getEmployeeId()).orElse(null));
    }
    if (history.getServiceDate() == null) {
      history.setServiceDate(LocalDateTime.now());
    }
    return serviceHistoryMapper.toResponse(
        serviceHistoryRepository.save(history));
  }

  @Override
  public void exportServiceHistory(HttpServletResponse response) {
    List<ServiceHistoryResponse> data = serviceHistoryRepository.findAll().stream()
        .map(serviceHistoryMapper::toResponse).toList();
    ExcelExportHelper.export(response, data, ServiceHistoryResponse.class, "DANH SÁCH LỊCH SỬ CHĂM SÓC", "danh-sach-lich-su-cham-soc");
  }
}
