package com.g7auto.application.config;

import com.g7auto.core.entity.AccountStatus;
import com.g7auto.core.entity.EmployeeStatus;
import com.g7auto.core.entity.Role;
import com.g7auto.domain.entity.Account;
import com.g7auto.domain.entity.Employee;
import com.g7auto.infrastructure.persistence.postgresql.AccountRepository;
import com.g7auto.infrastructure.persistence.postgresql.EmployeeApprovalRepository;
import com.g7auto.infrastructure.persistence.postgresql.EmployeeRepository;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jspecify.annotations.NonNull;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Component
@RequiredArgsConstructor
public class SuperAdminInitializer implements ApplicationRunner {

  private final SuperAdminProperties props;
  private final AccountRepository accountRepository;
  private final EmployeeRepository employeeRepository;
  private final EmployeeApprovalRepository employeeApprovalRepository;
  private final PasswordEncoder passwordEncoder;

  @Override
  @Transactional
  public void run(@NonNull ApplicationArguments args) {
    if (accountRepository.existsByUsername(props.getUsername())) {
      log.info("SuperAdmin '{}' đã tồn tại, bỏ qua khởi tạo.", props.getUsername());
      return;
    }

    Account account = new Account();
    account.setUsername(props.getUsername());
    account.setPassword(passwordEncoder.encode(props.getPassword()));
    account.setEmail(props.getEmail());
    account.setFullName(props.getFullName());
    account.setRoles(List.of(Role.SUPERADMIN));
    account.setStatus(AccountStatus.ACTIVE);
    account.setFailedLoginAttempts(0);
    accountRepository.save(account);

    Employee employee = new Employee();
    employee.setCode(generateNextCode());
    employee.setUsername(props.getUsername());
    employee.setFullName(props.getFullName());
    employee.setEmail(props.getEmail());
    employee.setPhone(props.getPhone());
    employee.setAddress(props.getAddress());
    employee.setBirthDate(props.getBirthDate());
    employee.setGender(props.getGender());
    employee.setNationalId(props.getNationalId());
    employee.setJoinDate(props.getJoinDate());
    employee.setEmployeeStatus(EmployeeStatus.ACTIVE);
    employeeRepository.save(employee);

    log.info("Đã khởi tạo tài khoản SuperAdmin '{}'.", props.getUsername());
  }

  private String generateNextCode() {
    int maxNum = 0;
    Optional<String> fromEmployees = employeeRepository.findMaxCode();
    Optional<String> fromApprovals = employeeApprovalRepository.findMaxCode();
    if (fromEmployees.isPresent()) {
      maxNum = Math.max(maxNum, Integer.parseInt(fromEmployees.get().substring(3)));
    }
    if (fromApprovals.isPresent()) {
      maxNum = Math.max(maxNum, Integer.parseInt(fromApprovals.get().substring(3)));
    }
    return String.format("G7A%05d", maxNum + 1);
  }
}
