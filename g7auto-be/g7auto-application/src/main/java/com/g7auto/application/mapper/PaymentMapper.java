package com.g7auto.application.mapper;

import com.g7auto.application.dto.request.PaymentRequest;
import com.g7auto.application.dto.response.PaymentResponse;
import com.g7auto.domain.entity.Payment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(config = BaseMapperConfig.class)
public interface PaymentMapper {

  @Mapping(source = "contract.id", target = "contractId")
  @Mapping(source = "contract.contractNumber", target = "contractNumber")
  @Mapping(source = "collector.id", target = "collectorId")
  @Mapping(source = "collector.fullName", target = "collectorName")
  @Mapping(source = "createdAt", target = "createdAt", qualifiedByName = "formatDateTime")
  PaymentResponse toResponse(Payment payment);

  @Mapping(target = "id", ignore = true)
  @Mapping(target = "contract", ignore = true)
  @Mapping(target = "installmentNumber", ignore = true)
  @Mapping(target = "collector", ignore = true)
  @Mapping(target = "status", ignore = true)
  @Mapping(target = "createdAt", ignore = true)
  @Mapping(target = "updatedAt", ignore = true)
  @Mapping(target = "createdBy", ignore = true)
  @Mapping(target = "updatedBy", ignore = true)
  Payment toEntity(PaymentRequest request);
}
