package com.g7auto.application.mapper;

import com.g7auto.application.dto.request.ServiceHistoryRequest;
import com.g7auto.application.dto.response.ServiceHistoryResponse;
import com.g7auto.domain.entity.ServiceHistory;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(config = BaseMapperConfig.class)
public interface ServiceHistoryMapper {

  @Mapping(source = "customer.id", target = "customerId")
  @Mapping(source = "customer.fullName", target = "customerFullName")
  @Mapping(source = "employee.id", target = "employeeId")
  @Mapping(source = "employee.fullName", target = "employeeFullName")
  @Mapping(source = "createdAt", target = "createdAt", qualifiedByName = "formatDateTime")
  ServiceHistoryResponse toResponse(ServiceHistory serviceHistory);

  @Mapping(target = "id", ignore = true)
  @Mapping(target = "customer", ignore = true)
  @Mapping(target = "employee", ignore = true)
  @Mapping(target = "createdAt", ignore = true)
  @Mapping(target = "updatedAt", ignore = true)
  @Mapping(target = "createdBy", ignore = true)
  @Mapping(target = "updatedBy", ignore = true)
  ServiceHistory toEntity(ServiceHistoryRequest request);
}
