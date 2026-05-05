package com.g7auto.application.service.impl;

import com.g7auto.application.dto.request.TestDriveRequest;
import com.g7auto.application.dto.request.TestDriveSearchRequest;
import com.g7auto.application.dto.response.TestDriveResponse;
import com.g7auto.application.mapper.TestDriveMapper;
import com.g7auto.application.service.TestDriveService;
import com.g7auto.core.constant.codes.ValidationErrorCode;
import com.g7auto.core.entity.TestDriveStatus;
import com.g7auto.core.exception.BadRequestException;
import com.g7auto.core.exception.NotFoundUtils;
import com.g7auto.core.export.ExcelExportHelper;
import com.g7auto.core.response.PageResponse;
import com.g7auto.core.utils.PageableUtils;
import com.g7auto.domain.entity.Car;
import com.g7auto.domain.entity.Customer;
import com.g7auto.domain.entity.Employee;
import com.g7auto.domain.entity.Showroom;
import com.g7auto.domain.entity.TestDrive;
import com.g7auto.infrastructure.persistence.CarRepository;
import com.g7auto.infrastructure.persistence.CustomerRepository;
import com.g7auto.infrastructure.persistence.EmployeeRepository;
import com.g7auto.infrastructure.persistence.ShowroomRepository;
import com.g7auto.infrastructure.persistence.TestDriveRepository;
import com.g7auto.infrastructure.persistence.query.TestDriveQueryRepository;
import jakarta.servlet.http.HttpServletResponse;
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
public class TestDriveServiceImpl implements TestDriveService {

  private final TestDriveRepository testDriveRepository;
  private final CustomerRepository customerRepository;
  private final CarRepository carRepository;
  private final EmployeeRepository employeeRepository;
  private final ShowroomRepository showroomRepository;
  private final TestDriveQueryRepository testDriveQueryRepository;
  private final TestDriveMapper testDriveMapper;

  @Override
  public PageResponse<TestDriveResponse> search(
      TestDriveSearchRequest request) {
    Pageable pageable = PageableUtils.from(request);
    return PageResponse.of(
        testDriveQueryRepository.search(request.getStatus(),
            request.getCustomerId(),
            request.getShowroomId(), request.getFromDate(), request.getToDate(), pageable),
        testDriveMapper::toResponse,
        request.getFromDate(), request.getToDate());
  }

  @Override
  public TestDriveResponse findById(Long id) {
    return testDriveMapper.toResponse(getTestDrive(id));
  }

  @Override
  @Transactional
  public TestDriveResponse create(TestDriveRequest testDriveRequest) {
    LocalDateTime startTime = testDriveRequest.getStartTime();
    LocalDateTime endTime = testDriveRequest.getEndTime();

    if (startTime == null || endTime == null || !endTime.isAfter(startTime)) {
      log.error("Thời gian kết thúc phải sau thời gian bắt đầu");
      throw new BadRequestException(ValidationErrorCode.G7_AUTO_00893);
    }

    if (startTime.isBefore(LocalDateTime.now().plusHours(2))) {
      log.error("Phải đăng ký trước ít nhất 2 giờ: {}", startTime);
      throw new BadRequestException(ValidationErrorCode.G7_AUTO_00894);
    }

    List<TestDrive> conflicts = testDriveRepository.findConflicting(
        testDriveRequest.getCarId(),
        startTime, endTime);
    if (!conflicts.isEmpty()) {
      log.error("Xe đã có lịch lái thử trong khung giờ này: {} - {}", startTime,
          endTime);
      throw new BadRequestException(ValidationErrorCode.G7_AUTO_00895);
    }

    Long customerId = testDriveRequest.getCustomerId();
    Customer customer = customerRepository.findById(customerId)
        .orElseThrow(() -> NotFoundUtils.customerIdNotFound(customerId));

    Long carId = testDriveRequest.getCarId();
    Car car = carRepository.findById(carId)
        .orElseThrow(() -> NotFoundUtils.carIdNotFound(carId));

    TestDrive testDrive = testDriveMapper.toEntity(testDriveRequest);
    testDrive.setCustomer(customer);
    testDrive.setCar(car);
    testDrive.setStatus(TestDriveStatus.PENDING);

    Long employeeId = testDriveRequest.getEmployeeId();
    if (employeeId != null) {
      Employee employee = employeeRepository.findById(employeeId)
          .orElseThrow(() -> NotFoundUtils.employeeIdNotFound(employeeId));
      testDrive.setEmployee(employee);
    }

    Long showroomId = testDriveRequest.getShowroomId();
    if (showroomId != null) {
      Showroom showroom = showroomRepository.findById(showroomId)
          .orElseThrow(() -> NotFoundUtils.showroomNotFound(showroomId));
      testDrive.setShowroom(showroom);
    }

    return testDriveMapper.toResponse(testDriveRepository.save(testDrive));
  }

  @Override
  @Transactional
  public TestDriveResponse confirm(Long id) {
    TestDrive td = getTestDrive(id);
    if (td.getStatus() != TestDriveStatus.PENDING) {
      log.error("Chỉ có thể xác nhận lịch lái thử đang chờ: {}",
          td.getStatus());
      throw new BadRequestException(ValidationErrorCode.G7_AUTO_00897);
    }
    td.setStatus(TestDriveStatus.CONFIRMED);
    return testDriveMapper.toResponse(testDriveRepository.save(td));
  }

  @Override
  @Transactional
  public TestDriveResponse complete(Long id, String notes) {
    TestDrive td = getTestDrive(id);

    TestDriveStatus status = td.getStatus();
    if (status != TestDriveStatus.CONFIRMED) {
      log.error("Chỉ có thể hoàn thành lịch lái thử đã xác nhận: {}", status);
      throw new BadRequestException(ValidationErrorCode.G7_AUTO_00898);
    }

    td.setStatus(TestDriveStatus.COMPLETED);
    if (notes != null) {
      td.setNotes(notes);
    }
    return testDriveMapper.toResponse(testDriveRepository.save(td));
  }

  @Override
  @Transactional
  public TestDriveResponse cancel(Long id) {
    TestDrive td = getTestDrive(id);
    if (td.getStatus() == TestDriveStatus.COMPLETED) {
      log.error("Không thể hủy lịch lái thử đã hoàn thành");
      throw new BadRequestException(ValidationErrorCode.G7_AUTO_00896);
    }
    td.setStatus(TestDriveStatus.CANCELLED);
    return testDriveMapper.toResponse(testDriveRepository.save(td));
  }

  @Override
  public void exportTestDrives(HttpServletResponse response) {
    List<TestDriveResponse> data = testDriveRepository.findAll().stream()
        .map(testDriveMapper::toResponse).toList();
    ExcelExportHelper.export(response, data, TestDriveResponse.class, "DANH SÁCH LÁI THỬ",
        "danh-sach-lai-thu");
  }

  private TestDrive getTestDrive(Long id) {
    return testDriveRepository.findById(id)
        .orElseThrow(() -> NotFoundUtils.testDriveIdNotFound(id));
  }
}
