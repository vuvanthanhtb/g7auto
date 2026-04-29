package com.g7auto.application.mapper;

import com.g7auto.application.dto.request.DepositRequest;
import com.g7auto.application.dto.response.DepositResponse;
import com.g7auto.domain.entity.Deposit;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(config = BaseMapperConfig.class)
public interface DepositMapper {

  @Mapping(source = "quotation.id", target = "quotationId")
  @Mapping(source = "customer.id", target = "customerId")
  @Mapping(source = "customer.fullName", target = "customerFullName")
  @Mapping(source = "car.id", target = "carId")
  @Mapping(source = "car.chassisNumber", target = "carChassisNumber")
  @Mapping(source = "employee.id", target = "employeeId")
  @Mapping(source = "employee.fullName", target = "employeeFullName")
  @Mapping(source = "depositPaymentMethod", target = "paymentMethod")
  @Mapping(source = "createdAt", target = "createdAt", qualifiedByName = "formatDateTime")
  DepositResponse toResponse(Deposit deposit);

  @Mapping(target = "id", ignore = true)
  @Mapping(target = "quotation", ignore = true)
  @Mapping(target = "customer", ignore = true)
  @Mapping(target = "car", ignore = true)
  @Mapping(target = "employee", ignore = true)
  @Mapping(target = "status", ignore = true)
  @Mapping(target = "createdAt", ignore = true)
  @Mapping(target = "updatedAt", ignore = true)
  @Mapping(target = "createdBy", ignore = true)
  @Mapping(target = "updatedBy", ignore = true)
  Deposit toEntity(DepositRequest request);
}
