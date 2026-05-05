package com.g7auto.application.service.impl;

import com.g7auto.application.dto.request.QuotationRequest;
import com.g7auto.application.dto.request.QuotationSearchRequest;
import com.g7auto.application.dto.response.QuotationResponse;
import com.g7auto.application.mapper.QuotationMapper;
import com.g7auto.application.service.QuotationService;
import com.g7auto.core.constant.codes.SalesErrorCode;
import com.g7auto.core.entity.QuotationStatus;
import com.g7auto.core.exception.BadRequestException;
import com.g7auto.core.exception.NotFoundUtils;
import com.g7auto.core.export.ExcelExportHelper;
import com.g7auto.core.response.PageResponse;
import com.g7auto.core.utils.PageableUtils;
import com.g7auto.domain.entity.Car;
import com.g7auto.domain.entity.Customer;
import com.g7auto.domain.entity.Quotation;
import com.g7auto.infrastructure.persistence.CarRepository;
import com.g7auto.infrastructure.persistence.CustomerRepository;
import com.g7auto.infrastructure.persistence.EmployeeRepository;
import com.g7auto.infrastructure.persistence.QuotationRepository;
import com.g7auto.infrastructure.persistence.query.QuotationQueryRepository;
import jakarta.servlet.http.HttpServletResponse;
import java.math.BigDecimal;
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
public class QuotationServiceImpl implements QuotationService {

  private final QuotationRepository quotationRepository;
  private final CustomerRepository customerRepository;
  private final CarRepository carRepository;
  private final EmployeeRepository employeeRepository;
  private final QuotationQueryRepository quotationQueryRepository;
  private final QuotationMapper quotationMapper;

  @Override
  public PageResponse<QuotationResponse> search(
      QuotationSearchRequest request) {
    Pageable pageable = PageableUtils.from(request);
    return PageResponse.of(
        quotationQueryRepository.search(request.getStatus(),
            request.getCustomerId(),
            request.getFromDate(), request.getToDate(), pageable),
        quotationMapper::toResponse,
        request.getFromDate(), request.getToDate());
  }

  @Override
  public QuotationResponse findById(Long id) {
    return quotationMapper.toResponse(getQuotation(id));
  }

  @Override
  @Transactional
  public QuotationResponse create(QuotationRequest request) {
    Long customerId = request.getCustomerId();
    Customer customer = customerRepository.findById(customerId)
        .orElseThrow(() -> NotFoundUtils.customerIdNotFound(customerId));

    Long carId = request.getCarId();
    Car car = carRepository.findById(carId)
        .orElseThrow(() -> NotFoundUtils.carIdNotFound(carId));

    Quotation q = quotationMapper.toEntity(request);
    q.setCustomer(customer);
    q.setCar(car);

    Long employeeId = request.getEmployeeId();
    if (employeeId != null) {
      q.setEmployee(employeeRepository.findById(employeeId).orElse(null));
    }

    if (q.getCarPrice() == null) {
      q.setCarPrice(BigDecimal.ZERO);
    }
    if (q.getAccessories() == null) {
      q.setAccessories(BigDecimal.ZERO);
    }
    if (q.getPromotion() == null) {
      q.setPromotion(BigDecimal.ZERO);
    }
    if (q.getOtherCosts() == null) {
      q.setOtherCosts(BigDecimal.ZERO);
    }

    q.setTotalAmount(
        q.getCarPrice().add(q.getAccessories()).subtract(q.getPromotion())
            .add(q.getOtherCosts()));
    q.setCreatedDate(LocalDateTime.now());
    q.setStatus(QuotationStatus.DRAFT);

    return quotationMapper.toResponse(quotationRepository.save(q));
  }

  @Override
  @Transactional
  public QuotationResponse send(Long id) {
    Quotation q = getQuotation(id);
    if (q.getStatus() != QuotationStatus.DRAFT) {
      log.error("Chỉ báo giá nháp mới có thể gửi: {}", q.getStatus());
      throw new BadRequestException(SalesErrorCode.G7_AUTO_00623);
    }
    q.setStatus(QuotationStatus.SENT);
    return quotationMapper.toResponse(quotationRepository.save(q));
  }

  @Override
  @Transactional
  public QuotationResponse accept(Long id) {
    Quotation q = getQuotation(id);
    if (q.getStatus() != QuotationStatus.SENT) {
      log.error("Chỉ báo giá đã gửi mới có thể chấp nhận: {}", q.getStatus());
      throw new BadRequestException(SalesErrorCode.G7_AUTO_00624);
    }
    q.setStatus(QuotationStatus.ACCEPTED);
    return quotationMapper.toResponse(quotationRepository.save(q));
  }

  @Override
  @Transactional
  public QuotationResponse cancel(Long id) {
    Quotation q = getQuotation(id);
    if (q.getStatus() == QuotationStatus.ACCEPTED) {
      log.error("Không thể hủy báo giá đã được chấp nhận: {}", id);
      throw new BadRequestException(SalesErrorCode.G7_AUTO_00625);
    }
    q.setStatus(QuotationStatus.CANCELLED);
    return quotationMapper.toResponse(quotationRepository.save(q));
  }

  @Override
  public void exportQuotations(HttpServletResponse response) {
    List<QuotationResponse> data = quotationRepository.findAll().stream()
        .map(quotationMapper::toResponse).toList();
    ExcelExportHelper.export(response, data, QuotationResponse.class, "DANH SÁCH BÁO GIÁ",
        "danh-sach-bao-gia");
  }

  private Quotation getQuotation(Long id) {
    return quotationRepository.findById(id)
        .orElseThrow(() -> NotFoundUtils.quotationIdNotFound(id));
  }
}
