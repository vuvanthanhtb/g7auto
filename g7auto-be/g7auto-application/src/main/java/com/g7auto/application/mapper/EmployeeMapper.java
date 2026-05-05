package com.g7auto.application.mapper;

import com.g7auto.application.dto.request.EmployeeRequest;
import com.g7auto.application.dto.response.EmployeeResponse;
import com.g7auto.domain.entity.Employee;
import com.g7auto.domain.entity.EmployeeApproval;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(config = BaseMapperConfig.class)
public interface EmployeeMapper {

  @Mapping(source = "showroom.id", target = "showroomId")
  @Mapping(source = "showroom.name", target = "showroomName")
  @Mapping(source = "createdAt", target = "createdAt", qualifiedByName = "formatDateTime")
  @Mapping(source = "updatedAt", target = "updatedAt", qualifiedByName = "formatDateTime")
  EmployeeResponse toResponse(Employee employee);

  @Mapping(target = "id", ignore = true)
  @Mapping(target = "employeeStatus", ignore = true)
  @Mapping(target = "showroom", ignore = true)
  @Mapping(target = "createdAt", ignore = true)
  @Mapping(target = "updatedAt", ignore = true)
  @Mapping(target = "createdBy", ignore = true)
  @Mapping(target = "updatedBy", ignore = true)
  Employee toEntity(EmployeeRequest request);

  @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
  @Mapping(target = "id", ignore = true)
  @Mapping(target = "employeeStatus", ignore = true)
  @Mapping(target = "showroom", ignore = true)
  @Mapping(target = "createdAt", ignore = true)
  @Mapping(target = "updatedAt", ignore = true)
  @Mapping(target = "createdBy", ignore = true)
  @Mapping(target = "updatedBy", ignore = true)
  void updateEntity(EmployeeRequest request, @MappingTarget Employee employee);

  @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
  @Mapping(target = "id", ignore = true)
  @Mapping(target = "createdAt", ignore = true)
  @Mapping(target = "updatedAt", ignore = true)
  @Mapping(target = "createdBy", ignore = true)
  @Mapping(target = "updatedBy", ignore = true)
  void mapEmployeeApprovalToEmployee(EmployeeApproval employeeApproval,
      @MappingTarget Employee employee);
}
