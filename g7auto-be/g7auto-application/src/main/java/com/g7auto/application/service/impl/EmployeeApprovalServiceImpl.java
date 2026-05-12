package com.g7auto.application.service.impl;

import static com.g7auto.core.utils.RoleUtils.hasRole;
import static com.g7auto.core.utils.RoleUtils.validateActionOnTarget;

import com.g7auto.application.dto.request.BulkStatusRequest;
import com.g7auto.application.dto.request.EmployeeApprovalSearchRequest;
import com.g7auto.application.dto.request.EmployeeRequest;
import com.g7auto.application.dto.request.StatusRequest;
import com.g7auto.application.dto.response.EmployeeResponse;
import com.g7auto.application.mapper.EmployeeApprovalMapper;
import com.g7auto.application.mapper.EmployeeMapper;
import com.g7auto.application.service.EmployeeApprovalService;
import com.g7auto.core.constant.codes.AuthErrorCode;
import com.g7auto.core.constant.codes.SuccessCode;
import com.g7auto.core.entity.AccountStatus;
import com.g7auto.core.entity.ApprovingStatus;
import com.g7auto.core.entity.EmployeeApprovalAction;
import com.g7auto.core.entity.EmployeeStatus;
import com.g7auto.core.entity.Role;
import com.g7auto.core.exception.BadRequestException;
import com.g7auto.core.exception.ConflictUtils;
import com.g7auto.core.exception.NotFoundUtils;
import com.g7auto.core.response.Page;
import com.g7auto.core.utils.DataUtils;
import com.g7auto.core.utils.PageableUtils;
import com.g7auto.domain.entity.Account;
import com.g7auto.domain.entity.Employee;
import com.g7auto.domain.entity.EmployeeApproval;
import com.g7auto.domain.entity.Showroom;
import com.g7auto.infrastructure.persistence.postgresql.AccountRepository;
import com.g7auto.infrastructure.persistence.postgresql.EmployeeApprovalRepository;
import com.g7auto.infrastructure.persistence.postgresql.EmployeeRepository;
import com.g7auto.infrastructure.persistence.postgresql.ShowroomRepository;
import com.g7auto.infrastructure.persistence.postgresql.query.EmployeeApprovalQueryRepository;
import java.util.List;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class EmployeeApprovalServiceImpl implements EmployeeApprovalService {

  EmployeeApprovalRepository employeeApprovalRepository;
  EmployeeApprovalQueryRepository employeeApprovalQueryRepository;
  EmployeeRepository employeeRepository;
  AccountRepository accountRepository;
  ShowroomRepository showroomRepository;
  EmployeeApprovalMapper employeeApprovalMapper;
  EmployeeMapper employeeMapper;
  PasswordEncoder passwordEncoder;

  @Override
  public Page<EmployeeResponse> search(EmployeeApprovalSearchRequest request) {
    return Page.of(
        employeeApprovalQueryRepository.search(
            request.getFullName(),
            request.getShowroomId(),
            request.getAction(),
            request.getStatusApproving(),
            request.getFromDate(),
            request.getToDate(),
            PageableUtils.from(request)
        ),
        employeeApprovalMapper::toResponse,
        request.getFromDate(), request.getToDate()
    );
  }

  @Override
  @Transactional
  public String create(EmployeeRequest request) {
    if (employeeRepository.findByNationalId(request.getNationalId()).isPresent()) {
      throw ConflictUtils.nationalIdConflict(request.getEmail());
    }
    EmployeeApproval empl = employeeApprovalMapper.toEntity(request);
    empl.setEmployeeApprovalAction(EmployeeApprovalAction.CREATE);
    empl.setStatusApproving(ApprovingStatus.AWAITING_APPROVAL);
    empl.setEmployeeStatus(EmployeeStatus.ACTIVE);
    empl.setUsername(generateUniqueUsername(request.getFullName()));
    employeeApprovalRepository.save(empl);
    return SuccessCode.G7_AUTO_00002;
  }

  private String generateUniqueUsername(String fullName) {
    String base = DataUtils.generateUsername(fullName);
    String candidate = base;
    int counter = 1;
    while (accountRepository.existsByUsername(candidate)) {
      candidate = base + counter++;
    }
    return candidate;
  }

  @Override
  @Transactional
  public String update(Long id, EmployeeRequest request) {
    Employee employee =
        employeeRepository.findById(id).orElseThrow(() -> NotFoundUtils.employeeIdNotFound(id));
    EmployeeApproval empl = employeeApprovalMapper.toEntity(request);
    empl.setEmployeeApprovalAction(EmployeeApprovalAction.UPDATE);
    empl.setStatusApproving(ApprovingStatus.AWAITING_APPROVAL);
    empl.setEmployeeStatus(EmployeeStatus.ACTIVE);
    empl.setUsername(employee.getUsername());
    employeeApprovalRepository.save(empl);
    return SuccessCode.G7_AUTO_00002;
  }

  @Override
  @Transactional
  public String delete(Long id) {
    Employee employee = employeeRepository.findById(id)
        .orElseThrow(() -> NotFoundUtils.employeeIdNotFound(id));
    EmployeeApproval employeeApproval = new EmployeeApproval();
    employeeApprovalMapper.mapEmployeeToEmployeeApproval(employee, employeeApproval);
    employeeApproval.setEmployeeApprovalAction(EmployeeApprovalAction.DELETE);
    employeeApprovalRepository.save(employeeApproval);
    return SuccessCode.G7_AUTO_00002;
  }

  @Override
  @Transactional
  public EmployeeResponse resign(Long id) {
    return null;
  }

  @Override
  public String requestApproval(StatusRequest request) {
    String action = request.getAction();
    if (!action.equalsIgnoreCase("APPROVE") && !action.equalsIgnoreCase("REJECT")) {
      throw new BadRequestException("action invalid");
    }

    String username = request.getUsername();
    EmployeeApproval employeeApproval =
        employeeApprovalRepository.findByUsernameAndStatusApproving(username,
                ApprovingStatus.AWAITING_APPROVAL)
            .orElseThrow(() -> NotFoundUtils.usernameNotFound(username));

    boolean isSuperAdmin = hasRole(Role.SUPERADMIN.name());
    boolean isApproval = hasRole(Role.APPROVAL.name());
    if (!isSuperAdmin && !isApproval) {
      throw new BadRequestException(AuthErrorCode.G7_AUTO_00202);
    }

    boolean isApproved = action.equalsIgnoreCase("APPROVE");

    employeeApproval.setStatusApproving(
        isApproved ? ApprovingStatus.APPROVED : ApprovingStatus.REJECTED);

    if (isApproved) {
      EmployeeApprovalAction actionApprove = employeeApproval.getEmployeeApprovalAction();

      Account account = accountRepository.findByUsername(username).orElse(null);

      if (actionApprove.equals(EmployeeApprovalAction.CREATE)) {
        if (account == null) {
          account = new Account();
          account.setUsername(employeeApproval.getUsername());
          account.setEmail(employeeApproval.getEmail());
          account.setFullName(employeeApproval.getFullName());
          account.setPassword(passwordEncoder.encode("123456"));
          account.setRoles(List.of(Role.SALES));
          account.setFailedLoginAttempts(0);
        }
        account.setStatus(AccountStatus.ACTIVE);
        Employee employee = new Employee();
        employeeMapper.mapEmployeeApprovalToEmployee(employeeApproval, employee);
        if (employeeApproval.getShowroomId() != null) {
          Showroom showroom = showroomRepository.findById(employeeApproval.getShowroomId())
              .orElse(null);
          employee.setShowroom(showroom);
        }
        employee.setEmployeeStatus(EmployeeStatus.ACTIVE);
        employeeRepository.save(employee);
        accountRepository.save(account);
      } else if (actionApprove.equals(EmployeeApprovalAction.UPDATE)) {
        if (account == null) {
          throw new BadRequestException(AuthErrorCode.G7_AUTO_00210);
        }
        validateActionOnTarget(account.getRoles());
        account.setStatus(AccountStatus.ACTIVE);
        Employee emp = employeeRepository.findByUsername(username)
            .orElseThrow(() -> NotFoundUtils.usernameNotFound(username));
        Employee employee = new Employee();
        employeeMapper.mapEmployeeApprovalToEmployee(employeeApproval, employee);
        if (employeeApproval.getShowroomId() != null) {
          Showroom showroom = showroomRepository.findById(employeeApproval.getShowroomId())
              .orElse(null);
          employee.setShowroom(showroom);
        }
        employee.setId(emp.getId());
        employee.setEmployeeStatus(EmployeeStatus.ACTIVE);
        employeeRepository.save(employee);
        accountRepository.save(account);
      } else if (actionApprove.equals(EmployeeApprovalAction.DELETE)) {
        if (account == null) {
          throw new BadRequestException(AuthErrorCode.G7_AUTO_00210);
        }
        validateActionOnTarget(account.getRoles());
        Employee emp = employeeRepository.findByUsername(username)
            .orElseThrow(() -> NotFoundUtils.usernameNotFound(username));
        emp.setEmployeeStatus(EmployeeStatus.LEAVED);
        account.setStatus(AccountStatus.INACTIVE);
        employeeRepository.save(emp);
        accountRepository.save(account);
      } else {
        throw new RuntimeException("action status invalid");
      }
    }

    employeeApprovalRepository.save(employeeApproval);

    return SuccessCode.G7_AUTO_00002;
  }

  @Override
  @Transactional
  public String bulkRequestApproval(BulkStatusRequest request) {
    for (String username : request.getUsernames()) {
      StatusRequest single = new StatusRequest();
      single.setUsername(username);
      single.setAction(request.getAction());
      requestApproval(single);
    }
    return SuccessCode.G7_AUTO_00002;
  }
}
