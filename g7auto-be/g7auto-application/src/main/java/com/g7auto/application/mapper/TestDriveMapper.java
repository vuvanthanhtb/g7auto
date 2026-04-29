package com.g7auto.application.mapper;

import com.g7auto.application.dto.request.TestDriveRequest;
import com.g7auto.application.dto.response.TestDriveResponse;
import com.g7auto.domain.entity.TestDrive;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(config = BaseMapperConfig.class)
public interface TestDriveMapper {

  @Mapping(source = "customer.id", target = "customerId")
  @Mapping(source = "customer.fullName", target = "customerFullName")
  @Mapping(source = "car.id", target = "carId")
  @Mapping(source = "car.chassisNumber", target = "carChassisNumber")
  @Mapping(source = "employee.id", target = "employeeId")
  @Mapping(source = "employee.fullName", target = "employeeFullName")
  @Mapping(source = "showroom.id", target = "showroomId")
  @Mapping(source = "showroom.name", target = "showroomName")
  @Mapping(source = "createdAt", target = "createdAt", qualifiedByName = "formatDateTime")
  TestDriveResponse toResponse(TestDrive testDrive);

  @Mapping(target = "id", ignore = true)
  @Mapping(target = "customer", ignore = true)
  @Mapping(target = "car", ignore = true)
  @Mapping(target = "employee", ignore = true)
  @Mapping(target = "showroom", ignore = true)
  @Mapping(target = "status", ignore = true)
  @Mapping(target = "createdAt", ignore = true)
  @Mapping(target = "updatedAt", ignore = true)
  @Mapping(target = "createdBy", ignore = true)
  @Mapping(target = "updatedBy", ignore = true)
  TestDrive toEntity(TestDriveRequest request);
}
