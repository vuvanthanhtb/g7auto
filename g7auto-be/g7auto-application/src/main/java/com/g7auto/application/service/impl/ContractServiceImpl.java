package com.g7auto.application.service.impl;

import com.g7auto.application.dto.request.ContractRequest;
import com.g7auto.application.dto.request.ContractSearchRequest;
import com.g7auto.application.dto.request.ContractUpdateRequest;
import com.g7auto.application.dto.response.ContractResponse;
import com.g7auto.application.mapper.ContractMapper;
import com.g7auto.application.service.ContractService;
import com.g7auto.core.constant.codes.SalesErrorCode;
import com.g7auto.core.entity.ContractStatus;
import com.g7auto.core.exception.BadRequestException;
import com.g7auto.core.exception.NotFoundUtils;
import com.g7auto.core.export.ExcelExportHelper;
import com.g7auto.core.response.PageResponse;
import com.g7auto.core.utils.PageableUtils;
import jakarta.servlet.http.HttpServletResponse;
import java.util.List;
import com.g7auto.domain.entity.Car;
import com.g7auto.domain.entity.Contract;
import com.g7auto.domain.entity.Customer;
import com.g7auto.domain.entity.Employee;
import com.g7auto.infrastructure.persistence.CarRepository;
import com.g7auto.infrastructure.persistence.ContractRepository;
import com.g7auto.infrastructure.persistence.CustomerRepository;
import com.g7auto.infrastructure.persistence.EmployeeRepository;
import com.g7auto.infrastructure.persistence.query.ContractQueryRepository;
import java.math.BigDecimal;
import java.time.LocalDate;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@RequiredArgsConstructor
public class ContractServiceImpl implements ContractService {

  private final ContractRepository contractRepository;
  private final CustomerRepository customerRepository;
  private final CarRepository carRepository;
  private final EmployeeRepository employeeRepository;
  private final ContractQueryRepository contractQueryRepository;
  private final ContractMapper contractMapper;

  @Override
  public PageResponse<ContractResponse> search(ContractSearchRequest request) {
    Pageable pageable = PageableUtils.from(request);
    return PageResponse.of(
        contractQueryRepository.search(request.getStatus(), request.getCustomerId(),
            request.getCarId(), request.getFromDate(), request.getToDate(), pageable),
        contractMapper::toResponse,
        request.getFromDate(), request.getToDate());
  }

  @Override
  public ContractResponse findById(Long id) {
    return contractMapper.toResponse(get(id));
  }

  @Override
  @Transactional
  public ContractResponse create(ContractRequest contractRequest) {
    Long customerId = contractRequest.getCustomerId();
    Customer customer = customerRepository.findById(customerId)
        .orElseThrow(() -> NotFoundUtils.customerIdNotFound(customerId));

    Contract create = contractMapper.toEntity(contractRequest);
    create.setPaidAmount(BigDecimal.ZERO);
    create.setRemainingAmount(create.getContractValue());
    create.setStatus(ContractStatus.NEW);

    Long carId = contractRequest.getCarId();
    Car car = carRepository.findById(carId).orElseThrow(() -> NotFoundUtils.carIdNotFound(carId));

    create.setCustomer(customer);
    create.setCar(car);

    Long employeeId = contractRequest.getEmployeeId();
    if (employeeId != null) {
      Employee employee = employeeRepository.findById(employeeId)
          .orElseThrow(() -> NotFoundUtils.employeeIdNotFound(employeeId));
      create.setEmployee(employee);
    }

    return contractMapper.toResponse(contractRepository.save(create));
  }

  @Override
  @Transactional
  public ContractResponse update(Long id, ContractUpdateRequest request) {
    Contract contract = get(id);

    ContractStatus status = contract.getStatus();

    // Basic validation for COMPLETED status
    if (status.equals(ContractStatus.COMPLETED)) {
      BigDecimal remainingAmount = contract.getRemainingAmount();
      if (remainingAmount.compareTo(BigDecimal.ZERO) > 0) {
        log.error("Không thể hoàn thành hợp đồng khi còn nợ: {}", remainingAmount);
        throw new BadRequestException(SalesErrorCode.G7_AUTO_00621);
      }

      if (contract.getActualDeliveryDate() == null) {
        contract.setActualDeliveryDate(LocalDate.now());
      }
    }

    if (status.equals(ContractStatus.COMPLETED ) || status.equals(ContractStatus.CANCELLED)) {
      log.error("Không thể cập nhật hợp đồng đã hoàn thành/hủy: {}", status);
      throw new BadRequestException(SalesErrorCode.G7_AUTO_00620);
    }

    contractMapper.updateEntity(request, contract);

    BigDecimal paidAmount = contract.getPaidAmount();
    // Recalculate remaining amount
    if (contract.getContractValue() != null) {
      BigDecimal paid = paidAmount != null ? paidAmount : BigDecimal.ZERO;
      contract.setRemainingAmount(contract.getContractValue().subtract(paid));
    }

    return contractMapper.toResponse(contractRepository.save(contract));
  }

  @Override
  @Transactional
  public void delete(Long id) {
    Contract contract = get(id);
    ContractStatus status = contract.getStatus();
    if (!status.equals(ContractStatus.NEW)) {
      log.error("Chỉ hợp đồng mới mới có thể xóa: {}", status);
      throw new BadRequestException(SalesErrorCode.G7_AUTO_00622);
    }
    contractRepository.delete(contract);
  }

  @Override
  public void exportContracts(HttpServletResponse response) {
    List<ContractResponse> data = contractRepository.findAll().stream().map(contractMapper::toResponse).toList();
    ExcelExportHelper.export(response, data, ContractResponse.class, "DANH SÁCH HỢP ĐỒNG", "danh-sach-hop-dong");
  }

  private Contract get(Long id) {
    return contractRepository.findById(id)
        .orElseThrow(() -> NotFoundUtils.contractIdNotFound(id));
  }
}
