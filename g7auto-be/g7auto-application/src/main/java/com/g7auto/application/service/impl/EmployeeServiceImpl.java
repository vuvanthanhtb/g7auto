package com.g7auto.application.service.impl;

import com.g7auto.application.dto.request.EmployeeRequest;
import com.g7auto.application.dto.request.EmployeeSearchRequest;
import com.g7auto.application.dto.response.EmployeeResponse;
import com.g7auto.application.mapper.EmployeeMapper;
import com.g7auto.application.service.EmployeeService;
import com.g7auto.core.constant.codes.HrErrorCode;
import com.g7auto.core.entity.EmployeeStatus;
import com.g7auto.core.exception.BadRequestException;
import com.g7auto.core.exception.NotFoundUtils;
import com.g7auto.core.export.ExcelExportHelper;
import com.g7auto.core.response.PageResponse;
import com.g7auto.core.utils.PageableUtils;
import jakarta.servlet.http.HttpServletResponse;
import java.util.List;
import com.g7auto.domain.entity.Account;
import com.g7auto.domain.entity.Employee;
import com.g7auto.domain.entity.Showroom;
import com.g7auto.infrastructure.persistence.AccountRepository;
import com.g7auto.infrastructure.persistence.EmployeeRepository;
import com.g7auto.infrastructure.persistence.ShowroomRepository;
import com.g7auto.infrastructure.persistence.query.EmployeeQueryRepository;
import java.time.LocalDate;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@RequiredArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

  private final EmployeeRepository employeeRepository;
  private final ShowroomRepository showroomRepository;
  private final AccountRepository accountRepository;
  private final EmployeeQueryRepository employeeQueryRepository;
  private final EmployeeMapper employeeMapper;

  @Override
  public PageResponse<EmployeeResponse> search(EmployeeSearchRequest request) {
    Pageable pageable = PageableUtils.from(request);
    return PageResponse.of(
        employeeQueryRepository.search(request.getFullName(),
            request.getShowroomId(),
            request.getEmployeeStatus(), request.getFromDate(), request.getToDate(), pageable),
        employeeMapper::toResponse,
        request.getFromDate(), request.getToDate());
  }

  @Override
  public EmployeeResponse findById(Long id) {
    return employeeMapper.toResponse(get(id));
  }

  @Override
  @Transactional
  public EmployeeResponse create(EmployeeRequest request) {
    Employee employee = employeeMapper.toEntity(request);
    setShowroomId(request, employee);

    if (employee.getJoinDate() == null) {
      employee.setJoinDate(LocalDate.now());
    }

    employee.setEmployeeStatus(EmployeeStatus.ACTIVE);

    return employeeMapper.toResponse(employeeRepository.save(employee));
  }


  @Override
  @Transactional
  public EmployeeResponse update(Long id, EmployeeRequest request) {
    Employee employee = get(id);
    setShowroomId(request, employee);
    employeeMapper.updateEntity(request, employee);
    return employeeMapper.toResponse(employeeRepository.save(employee));
  }

  @Override
  @Transactional
  public EmployeeResponse resign(Long id) {
    Employee employee = get(id);
    if (employee.getEmployeeStatus() == EmployeeStatus.LEAVED) {
      log.error("Nhân viên này đã nghỉ việc: {}", id);
      throw new BadRequestException(HrErrorCode.G7_AUTO_00709);
    }
    employee.setEmployeeStatus(EmployeeStatus.LEAVED);
    return employeeMapper.toResponse(employeeRepository.save(employee));
  }

  @Override
  @Transactional
  public EmployeeResponse transferShowroom(Long id, Long newShowroomId) {
    Employee e = get(id);
    if (e.getEmployeeStatus() == EmployeeStatus.LEAVED) {
      log.error("Không thể điều chuyển nhân viên đã nghỉ việc: {}", id);
      throw new BadRequestException(HrErrorCode.G7_AUTO_00710);
    }
    Showroom showroom = showroomRepository.findById(newShowroomId)
        .orElseThrow(() -> NotFoundUtils.showroomNotFound(newShowroomId));
    e.setShowroom(showroom);
    return employeeMapper.toResponse(employeeRepository.save(e));
  }

  private void setShowroomId(EmployeeRequest request, Employee employee) {
    Long showroomId = request.getShowroomId();
    if (showroomId != null) {
      Showroom showroom = showroomRepository.findById(showroomId)
          .orElseThrow(() -> NotFoundUtils.showroomNotFound(showroomId));
      employee.setShowroom(showroom);
    }

    Long accountId = request.getAccountId();
    if (accountId != null) {
      Account account = accountRepository.findById(accountId)
          .orElseThrow(() -> NotFoundUtils.accountIdNotFound(accountId));
      employee.setAccount(account);
    }
  }

  @Override
  public void exportEmployees(HttpServletResponse response) {
    List<EmployeeResponse> data = employeeRepository.findAll().stream()
        .map(employeeMapper::toResponse).toList();
    ExcelExportHelper.export(response, data, EmployeeResponse.class, "DANH SÁCH NHÂN VIÊN", "danh-sach-nhan-vien");
  }

  private Employee get(Long id) {
    return employeeRepository.findById(id)
        .orElseThrow(() -> NotFoundUtils.employeeIdNotFound(id));
  }
}
