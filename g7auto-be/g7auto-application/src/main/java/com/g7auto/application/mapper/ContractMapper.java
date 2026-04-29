package com.g7auto.application.mapper;

import com.g7auto.application.dto.request.ContractRequest;
import com.g7auto.application.dto.request.ContractUpdateRequest;
import com.g7auto.application.dto.response.ContractResponse;
import com.g7auto.domain.entity.Contract;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import org.mapstruct.AfterMapping;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(config = BaseMapperConfig.class)
public interface ContractMapper {

  @Mapping(source = "customer.id", target = "customerId")
  @Mapping(source = "customer.fullName", target = "customerFullName")
  @Mapping(source = "car.id", target = "carId")
  @Mapping(source = "car.chassisNumber", target = "carChassisNumber")
  @Mapping(source = "employee.id", target = "employeeId")
  @Mapping(source = "employee.fullName", target = "employeeFullName")
  @Mapping(source = "createdAt", target = "createdAt", qualifiedByName = "formatDateTime")
  @Mapping(source = "updatedAt", target = "updatedAt", qualifiedByName = "formatDateTime")
  ContractResponse toResponse(Contract contract);

  @Mapping(target = "id", ignore = true)
  @Mapping(target = "contractNumber", ignore = true)
  @Mapping(target = "customer", ignore = true)
  @Mapping(target = "car", ignore = true)
  @Mapping(target = "employee", ignore = true)
  @Mapping(target = "deposit", ignore = true)
  @Mapping(target = "actualDeliveryDate", ignore = true)
  @Mapping(target = "paidAmount", ignore = true)
  @Mapping(target = "remainingAmount", ignore = true)
  @Mapping(target = "status", ignore = true)
  @Mapping(target = "createdAt", ignore = true)
  @Mapping(target = "updatedAt", ignore = true)
  @Mapping(target = "createdBy", ignore = true)
  @Mapping(target = "updatedBy", ignore = true)
  Contract toEntity(ContractRequest request);

  @AfterMapping
  default void afterToEntity(ContractRequest request,
      @MappingTarget Contract contract) {
    String timestamp = LocalDateTime.now()
        .format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));
    contract.setContractNumber("HD" + timestamp + "G7AUTO");
  }

  @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
  @Mapping(target = "id", ignore = true)
  @Mapping(target = "contractNumber", ignore = true)
  @Mapping(target = "customer", ignore = true)
  @Mapping(target = "car", ignore = true)
  @Mapping(target = "employee", ignore = true)
  @Mapping(target = "deposit", ignore = true)
  @Mapping(target = "signDate", ignore = true)
  @Mapping(target = "expectedDeliveryDate", ignore = true)
  @Mapping(target = "contractValue", ignore = true)
  @Mapping(target = "paidAmount", ignore = true)
  @Mapping(target = "remainingAmount", ignore = true)
  @Mapping(target = "createdAt", ignore = true)
  @Mapping(target = "updatedAt", ignore = true)
  @Mapping(target = "createdBy", ignore = true)
  @Mapping(target = "updatedBy", ignore = true)
  void updateEntity(ContractUpdateRequest request,
      @MappingTarget Contract contract);
}
