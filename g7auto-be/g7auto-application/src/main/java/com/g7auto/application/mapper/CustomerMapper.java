package com.g7auto.application.mapper;

import com.g7auto.application.dto.request.CustomerRequest;
import com.g7auto.application.dto.response.CustomerResponse;
import com.g7auto.domain.entity.Customer;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(config = BaseMapperConfig.class)
public interface CustomerMapper {

  @Mapping(source = "createdAt", target = "createdAt", qualifiedByName = "formatDateTime")
  @Mapping(source = "updatedAt", target = "updatedAt", qualifiedByName = "formatDateTime")
  CustomerResponse toResponse(Customer customer);

  @Mapping(target = "id", ignore = true)
  @Mapping(target = "createdAt", ignore = true)
  @Mapping(target = "updatedAt", ignore = true)
  @Mapping(target = "createdBy", ignore = true)
  @Mapping(target = "updatedBy", ignore = true)
  Customer toEntity(CustomerRequest request);

  @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
  @Mapping(target = "id", ignore = true)
  @Mapping(target = "createdAt", ignore = true)
  @Mapping(target = "updatedAt", ignore = true)
  @Mapping(target = "createdBy", ignore = true)
  @Mapping(target = "updatedBy", ignore = true)
  void updateEntity(CustomerRequest request, @MappingTarget Customer customer);
}
