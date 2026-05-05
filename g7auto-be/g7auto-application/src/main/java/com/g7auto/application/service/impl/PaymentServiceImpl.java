package com.g7auto.application.service.impl;

import com.g7auto.application.dto.request.PaymentRequest;
import com.g7auto.application.dto.response.PaymentResponse;
import com.g7auto.application.mapper.PaymentMapper;
import com.g7auto.application.service.PaymentService;
import com.g7auto.core.constant.codes.SalesErrorCode;
import com.g7auto.core.entity.CarStatus;
import com.g7auto.core.entity.ContractStatus;
import com.g7auto.core.entity.PaymentStatus;
import com.g7auto.core.exception.BadRequestException;
import com.g7auto.core.exception.NotFoundUtils;
import com.g7auto.core.export.ExcelExportHelper;
import com.g7auto.domain.entity.Car;
import com.g7auto.domain.entity.Contract;
import com.g7auto.domain.entity.Payment;
import com.g7auto.infrastructure.persistence.CarRepository;
import com.g7auto.infrastructure.persistence.ContractRepository;
import com.g7auto.infrastructure.persistence.EmployeeRepository;
import com.g7auto.infrastructure.persistence.PaymentRepository;
import jakarta.servlet.http.HttpServletResponse;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {

  private final PaymentRepository paymentRepository;
  private final ContractRepository contractRepository;
  private final EmployeeRepository employeeRepository;
  private final CarRepository carRepository;
  private final PaymentMapper paymentMapper;

  @Override
  public List<PaymentResponse> findByContract(Long contractId) {
    return paymentRepository.findByContractIdOrderByInstallmentNumber(
            contractId)
        .stream().map(paymentMapper::toResponse).toList();
  }

  @Override
  public PaymentResponse findById(Long id) {
    return paymentMapper.toResponse(getPayment(id));
  }

  @Override
  @Transactional
  public PaymentResponse create(PaymentRequest paymentRequest) {
    Long contractId = paymentRequest.getContractId();
    Contract contract = contractRepository.findById(contractId)
        .orElseThrow(() -> NotFoundUtils.contractIdNotFound(contractId));

    if (contract.getStatus() == ContractStatus.COMPLETED
        || contract.getStatus() == ContractStatus.CANCELLED) {
      log.error(
          "Không thể thêm thanh toán cho hợp đồng đã kết thúc hoặc bị hủy: {}",
          contract.getStatus());
      throw new BadRequestException(SalesErrorCode.G7_AUTO_00620);
    }

    BigDecimal amount = paymentRequest.getAmount();
    if (amount == null || amount.compareTo(BigDecimal.ZERO) <= 0) {
      log.error("Số tiền thanh toán phải lớn hơn 0: {}", amount);
      throw new BadRequestException(SalesErrorCode.G7_AUTO_00630);
    }

    if (contract.getRemainingAmount() != null
        && amount.compareTo(contract.getRemainingAmount()) > 0) {
      log.error("Số tiền thanh toán vượt quá số nợ còn lại: {}",
          contract.getRemainingAmount());
      throw new BadRequestException(SalesErrorCode.G7_AUTO_00631);
    }

    Payment payment = paymentMapper.toEntity(paymentRequest);
    payment.setContract(contract);
    payment.setInstallmentNumber(
        paymentRepository.countByContractId(contract.getId()) + 1);
    payment.setStatus(PaymentStatus.PENDING);
    if (payment.getPaymentTime() == null) {
      payment.setPaymentTime(LocalDateTime.now());
    }

    if (paymentRequest.getCollectorId() != null) {
      payment.setCollector(
          employeeRepository.findById(paymentRequest.getCollectorId())
              .orElse(null));
    }

    return paymentMapper.toResponse(paymentRepository.save(payment));
  }

  @Override
  @Transactional
  public PaymentResponse confirm(Long id) {
    Payment payment = getPayment(id);
    if (payment.getStatus() != PaymentStatus.PENDING) {
      log.error("Chỉ thanh toán chờ mới có thể xác nhận: {}",
          payment.getStatus());
      throw new BadRequestException(SalesErrorCode.G7_AUTO_00632);
    }
    payment.setStatus(PaymentStatus.CONFIRMED);
    paymentRepository.save(payment);
    Contract contract = payment.getContract();
    BigDecimal currentPaid =
        contract.getPaidAmount() != null ? contract.getPaidAmount()
            : BigDecimal.ZERO;
    BigDecimal newPaid = currentPaid.add(payment.getAmount());
    contract.setPaidAmount(newPaid);
    contract.setRemainingAmount(contract.getContractValue().subtract(newPaid));
    if (contract.getRemainingAmount().compareTo(BigDecimal.ZERO) <= 0) {
      contract.setStatus(ContractStatus.COMPLETED);
      Car car = contract.getCar();
      car.setStatus(CarStatus.SOLD);
      carRepository.save(car);
    } else {
      contract.setStatus(ContractStatus.IN_PAYMENT);
    }
    contractRepository.save(contract);
    return paymentMapper.toResponse(payment);
  }

  @Override
  @Transactional
  public PaymentResponse cancel(Long id) {
    Payment payment = getPayment(id);
    if (payment.getStatus() == PaymentStatus.CONFIRMED) {
      log.error("Không thể hủy thanh toán đã xác nhận: {}", id);
      throw new BadRequestException(SalesErrorCode.G7_AUTO_00633);
    }
    payment.setStatus(PaymentStatus.FAILED);
    return paymentMapper.toResponse(paymentRepository.save(payment));
  }

  @Override
  public void exportPayments(HttpServletResponse response) {
    List<PaymentResponse> data = paymentRepository.findAll().stream().map(paymentMapper::toResponse)
        .toList();
    ExcelExportHelper.export(response, data, PaymentResponse.class, "DANH SÁCH THANH TOÁN",
        "danh-sach-thanh-toan");
  }

  private Payment getPayment(Long id) {
    return paymentRepository.findById(id)
        .orElseThrow(() -> NotFoundUtils.paymentIdNotFound(id));
  }
}
