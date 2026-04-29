package com.g7auto.application.service.impl;

import com.g7auto.application.dto.request.DepositRequest;
import com.g7auto.application.dto.request.DepositSearchRequest;
import com.g7auto.application.dto.response.ContractResponse;
import com.g7auto.application.dto.response.DepositResponse;
import com.g7auto.application.mapper.ContractMapper;
import com.g7auto.application.mapper.DepositMapper;
import com.g7auto.application.service.DepositService;
import com.g7auto.core.constant.codes.CarErrorCode;
import com.g7auto.core.constant.codes.SalesErrorCode;
import com.g7auto.core.entity.CarStatus;
import com.g7auto.core.entity.ContractStatus;
import com.g7auto.core.entity.DepositStatus;
import com.g7auto.core.exception.BadRequestException;
import com.g7auto.core.exception.NotFoundUtils;
import com.g7auto.core.export.ExcelExportHelper;
import com.g7auto.core.response.PageResponse;
import jakarta.servlet.http.HttpServletResponse;
import com.g7auto.core.utils.PageableUtils;
import com.g7auto.domain.entity.Car;
import com.g7auto.domain.entity.Contract;
import com.g7auto.domain.entity.Customer;
import com.g7auto.domain.entity.Deposit;
import com.g7auto.domain.entity.Employee;
import com.g7auto.domain.entity.Quotation;
import com.g7auto.infrastructure.persistence.CarRepository;
import com.g7auto.infrastructure.persistence.ContractRepository;
import com.g7auto.infrastructure.persistence.CustomerRepository;
import com.g7auto.infrastructure.persistence.DepositRepository;
import com.g7auto.infrastructure.persistence.EmployeeRepository;
import com.g7auto.infrastructure.persistence.QuotationRepository;
import com.g7auto.infrastructure.persistence.query.DepositQueryRepository;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@RequiredArgsConstructor
public class DepositServiceImpl implements DepositService {

  private final DepositRepository depositRepository;
  private final CarRepository carRepository;
  private final CustomerRepository customerRepository;
  private final EmployeeRepository employeeRepository;
  private final QuotationRepository quotationRepository;
  private final ContractRepository contractRepository;
  private final DepositQueryRepository depositQueryRepository;
  private final DepositMapper depositMapper;
  private final ContractMapper contractMapper;

  @Override
  public PageResponse<DepositResponse> search(DepositSearchRequest request) {
    Pageable pageable = PageableUtils.from(request);
    return PageResponse.of(
        depositQueryRepository.search(request.getStatus(), request.getCustomerId(), request.getFromDate(), request.getToDate(), pageable),
        depositMapper::toResponse,
        request.getFromDate(), request.getToDate());
  }

  @Override
  public DepositResponse findById(Long id) {
    return depositMapper.toResponse(getDeposit(id));
  }

  @Override
  @Transactional
  public DepositResponse create(DepositRequest request) {
    BigDecimal amount = request.getAmount();
    if (amount == null || amount.compareTo(BigDecimal.ZERO) <= 0) {
      log.error("Số tiền đặt cọc phải lớn hơn 0: {}", amount);
      throw new BadRequestException(SalesErrorCode.G7_AUTO_00609);
    }

    Long carId = request.getCarId();
    Car car = carRepository.findById(carId).orElseThrow(() -> NotFoundUtils.carIdNotFound(carId));

    CarStatus carStatus = car.getStatus();
    if (carStatus != CarStatus.AVAILABLE && carStatus != CarStatus.NEW_ARRIVAL) {
      log.error("Xe không ở trạng thái sẵn sàng để đặt cọc: {}", carStatus);
      throw new BadRequestException(CarErrorCode.G7_AUTO_00309);
    }

    List<Deposit> activeDeposits = depositRepository.findByCarIdAndStatus(
        carId, DepositStatus.HOLDING);
    if (!activeDeposits.isEmpty()) {
      log.error("Xe đã có phiếu đặt cọc đang hiệu lực: {}", carId);
      throw new BadRequestException(SalesErrorCode.G7_AUTO_00613);
    }

    Long customerId = request.getCustomerId();
    Customer customer = customerRepository.findById(customerId)
        .orElseThrow(() -> NotFoundUtils.customerIdNotFound(customerId));

    Deposit deposit = depositMapper.toEntity(request);
    deposit.setCustomer(customer);
    deposit.setCar(car);

    Long quotationId = request.getQuotationId();
    if (quotationId != null) {
      Quotation quotation = quotationRepository.findById(quotationId)
          .orElseThrow(() -> NotFoundUtils.quotationIdNotFound(quotationId));
      deposit.setQuotation(quotation);
    }

    Long employeeId = request.getEmployeeId();
    if (employeeId != null) {
      Employee employee = employeeRepository.findById(employeeId)
          .orElseThrow(() -> NotFoundUtils.employeeIdNotFound(employeeId));
      deposit.setEmployee(employee);
    }

    if (deposit.getDepositDate() == null) {
      deposit.setDepositDate(LocalDate.now());
    }
    deposit.setStatus(DepositStatus.HOLDING);

    car.setStatus(CarStatus.DEPOSITED);
    carRepository.save(car);

    return depositMapper.toResponse(depositRepository.save(deposit));
  }

  @Override
  @Transactional
  public DepositResponse refund(Long id, String notes) {
    Deposit deposit = getDeposit(id);
    if (deposit.getStatus() != DepositStatus.HOLDING) {
      log.error("Chỉ có thể hoàn tiền cho phiếu cọc đang giữ xe: {}", deposit.getStatus());
      throw new BadRequestException(SalesErrorCode.G7_AUTO_00614);
    }
    deposit.setStatus(DepositStatus.REFUNDED);
    if (notes != null) {
      deposit.setNotes(notes);
    }
    deposit.getCar().setStatus(CarStatus.AVAILABLE);
    carRepository.save(deposit.getCar());
    return depositMapper.toResponse(depositRepository.save(deposit));
  }

  @Override
  @Transactional
  public DepositResponse cancel(Long id, String reason) {
    Deposit deposit = getDeposit(id);
    if (deposit.getStatus() != DepositStatus.HOLDING) {
      log.error("Chỉ có thể hủy phiếu cọc đang giữ xe: {}", deposit.getStatus());
      throw new BadRequestException(SalesErrorCode.G7_AUTO_00615);
    }
    deposit.setStatus(DepositStatus.CANCELLED);
    deposit.getCar().setStatus(CarStatus.AVAILABLE);
    carRepository.save(deposit.getCar());
    return depositMapper.toResponse(depositRepository.save(deposit));
  }

  @Override
  @Transactional
  public ContractResponse convertToContract(Long depositId, String contractNumber,
      LocalDate signDate, LocalDate expectedDeliveryDate, String notes) {
    Deposit deposit = getDeposit(depositId);

    DepositStatus status = deposit.getStatus();
    if (status != DepositStatus.HOLDING) {
      log.error("Phiếu đặt cọc phải ở trạng thái ĐANG GIỮ để chuyển thành hợp đồng: {}", status);
      throw new BadRequestException(SalesErrorCode.G7_AUTO_00613);
    }
    if (contractRepository.existsByContractNumber(contractNumber)) {
      log.error("Số hợp đồng đã tồn tại: {}", contractNumber);
      throw new BadRequestException(SalesErrorCode.G7_AUTO_00603);
    }
    Contract contract = new Contract();
    contract.setContractNumber(contractNumber);
    contract.setCustomer(deposit.getCustomer());
    contract.setCar(deposit.getCar());
    contract.setEmployee(deposit.getEmployee());
    contract.setDeposit(deposit);
    contract.setSignDate(signDate != null ? signDate : LocalDate.now());
    contract.setExpectedDeliveryDate(expectedDeliveryDate);
    BigDecimal contractValue =
        deposit.getQuotation() != null && deposit.getQuotation().getTotalAmount() != null
            ? deposit.getQuotation().getTotalAmount()
            : BigDecimal.ZERO;
    contract.setContractValue(contractValue);
    contract.setPaidAmount(BigDecimal.ZERO);
    contract.setRemainingAmount(contractValue);
    contract.setStatus(ContractStatus.NEW);
    contract.setNotes(notes);
    deposit.setStatus(DepositStatus.CONVERTED);
    depositRepository.save(deposit);
    Contract saved = contractRepository.save(contract);
    return contractMapper.toResponse(saved);
  }

  @Override
  public void exportDeposits(HttpServletResponse response) {
    List<DepositResponse> data = depositRepository.findAll().stream().map(depositMapper::toResponse).toList();
    ExcelExportHelper.export(response, data, DepositResponse.class, "DANH SÁCH ĐẶT CỌC", "danh-sach-dat-coc");
  }

  private Deposit getDeposit(Long id) {
    return depositRepository.findById(id)
        .orElseThrow(() -> NotFoundUtils.depositIdNotFound(id));
  }
}
