package com.g7auto.application.service.impl;

import static com.g7auto.core.utils.RoleUtils.hasRole;
import static com.g7auto.core.utils.RoleUtils.validateActionOnTarget;

import com.g7auto.application.dto.request.BulkStatusRequest;
import com.g7auto.application.dto.request.EmployeeApprovalSearchRequest;
import com.g7auto.application.dto.request.EmployeeRequest;
import com.g7auto.application.dto.request.StatusRequest;
import com.g7auto.application.dto.response.EmployeeResponse;
import com.g7auto.application.dto.response.ImportResult;
import com.g7auto.application.mapper.EmployeeApprovalMapper;
import com.g7auto.application.mapper.EmployeeMapper;
import com.g7auto.application.service.EmployeeApprovalService;
import com.g7auto.core.constant.codes.AuthErrorCode;
import com.g7auto.core.constant.codes.SuccessCode;
import com.g7auto.core.constant.codes.SystemErrorCode;
import com.g7auto.core.entity.AccountStatus;
import com.g7auto.core.entity.ApprovingStatus;
import com.g7auto.core.entity.EmployeeApprovalAction;
import com.g7auto.core.entity.EmployeeStatus;
import com.g7auto.core.entity.Role;
import com.g7auto.core.exception.BadRequestException;
import com.g7auto.core.exception.ConflictUtils;
import com.g7auto.core.exception.NotFoundUtils;
import com.g7auto.core.export.ExcelSupport;
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
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

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
    empl.setCode(generateNextCode());
    employeeApprovalRepository.save(empl);
    return SuccessCode.G7_AUTO_00002;
  }

  @Override
  @Transactional
  public ImportResult importEmployeeApprovals(MultipartFile file) {
    int total = 0, success = 0, failed = 0;
    List<String> errors = new ArrayList<>();

    try (Workbook wb = new XSSFWorkbook(file.getInputStream())) {
      Sheet sheet = wb.getSheetAt(0);
      for (int i = 1; i <= sheet.getLastRowNum(); i++) {
        Row row = sheet.getRow(i);
        if (row == null) {
          continue;
        }
        total++;
        try {
          EmployeeRequest req = new EmployeeRequest();
          req.setFullName(getCellString(row, 0));
          req.setPhone(getCellString(row, 1));
          req.setEmail(getCellString(row, 2));
          req.setAddress(getCellString(row, 3));
          String birthDateStr = getCellString(row, 4);
          if (!birthDateStr.isBlank()) {
            req.setBirthDate(LocalDate.parse(birthDateStr));
          }
          req.setGender(getCellString(row, 5));
          req.setNationalId(getCellString(row, 6));
          String joinDateStr = getCellString(row, 7);
          if (!joinDateStr.isBlank()) {
            req.setJoinDate(LocalDate.parse(joinDateStr));
          }
          String showroomIdStr = getCellString(row, 8);
          if (!showroomIdStr.isBlank()) {
            try {
              req.setShowroomId(Long.parseLong(showroomIdStr));
            } catch (NumberFormatException ignored) {
            }
          }
          create(req);
          success++;
        } catch (Exception e) {
          failed++;
          errors.add("Dòng " + (i + 1) + ": " + e.getMessage());
        }
      }
    } catch (IOException e) {
      log.error("Lỗi đọc file import nhân viên: {}", e.getMessage());
      throw new BadRequestException(SystemErrorCode.G7_AUTO_00100);
    }

    return new ImportResult(total, success, failed, errors);
  }

  @Override
  public void downloadEmployeeApprovalTemplate(HttpServletResponse response) {
    ExcelSupport.prepareResponse(response, "mau-import-nhan-vien.xlsx");
    try (SXSSFWorkbook workbook = ExcelSupport.createWorkbook()) {
      Sheet sheet = workbook.createSheet("NhanVien");
      Row header = sheet.createRow(0);
      String[] cols = {"fullName", "phone", "email", "address", "birthDate(yyyy-MM-dd)",
          "gender", "nationalId", "joinDate(yyyy-MM-dd)", "showroomId"};
      for (int i = 0; i < cols.length; i++) {
        header.createCell(i).setCellValue(cols[i]);
      }
      workbook.write(response.getOutputStream());
    } catch (IOException e) {
      log.error("Lỗi tạo template nhân viên: {}", e.getMessage());
      throw new BadRequestException(SystemErrorCode.G7_AUTO_00100);
    }
  }

  private String getCellString(Row row, int col) {
    Cell cell = row.getCell(col);
    if (cell == null) {
      return "";
    }
    return switch (cell.getCellType()) {
      case STRING -> cell.getStringCellValue().trim();
      case NUMERIC -> {
        double val = cell.getNumericCellValue();
        yield (val == Math.floor(val)) ? String.valueOf((long) val) : String.valueOf(val);
      }
      default -> "";
    };
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
    empl.setCode(employee.getCode());
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
