package com.g7auto.application.mapper;

import com.g7auto.application.dto.request.EmployeeRequest;
import com.g7auto.application.dto.response.EmployeeResponse;
import com.g7auto.core.entity.ApprovingStatus;
import com.g7auto.domain.entity.Employee;
import com.g7auto.domain.entity.EmployeeApproval;
import org.mapstruct.AfterMapping;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(config = BaseMapperConfig.class)
public interface EmployeeApprovalMapper {

  @Mapping(source = "createdAt", target = "createdAt", qualifiedByName = "formatDateTime")
  @Mapping(source = "updatedAt", target = "updatedAt", qualifiedByName = "formatDateTime")
  EmployeeResponse toResponse(EmployeeApproval employeeApproval);

  @Mapping(target = "id", ignore = true)
  @Mapping(target = "createdAt", ignore = true)
  @Mapping(target = "updatedAt", ignore = true)
  @Mapping(target = "createdBy", ignore = true)
  @Mapping(target = "updatedBy", ignore = true)
  EmployeeApproval toEntity(EmployeeRequest request);

  @AfterMapping
  default void setDefaultStatus(@MappingTarget EmployeeApproval entity) {
    if (entity.getStatusApproving() == null) {
      entity.setStatusApproving(ApprovingStatus.AWAITING_APPROVAL);
    }
  }

  @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
  @Mapping(target = "id", ignore = true)
  @Mapping(target = "createdAt", ignore = true)
  @Mapping(target = "updatedAt", ignore = true)
  @Mapping(target = "createdBy", ignore = true)
  @Mapping(target = "updatedBy", ignore = true)
  void mapEmployeeToEmployeeApproval(Employee employee,
      @MappingTarget EmployeeApproval employeeApproval);
}
