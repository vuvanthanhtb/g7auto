package com.g7auto.application.mapper;

import com.g7auto.application.dto.request.CarTransferRequest;
import com.g7auto.application.dto.response.CarTransferResponse;
import com.g7auto.domain.entity.CarTransfer;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(config = BaseMapperConfig.class)
public interface CarTransferMapper {

  @Mapping(source = "car.id", target = "carId")
  @Mapping(source = "car.chassisNumber", target = "carChassisNumber")
  @Mapping(source = "fromShowroom.id", target = "fromShowroomId")
  @Mapping(source = "fromShowroom.name", target = "fromShowroomName")
  @Mapping(source = "toShowroom.id", target = "toShowroomId")
  @Mapping(source = "toShowroom.name", target = "toShowroomName")
  @Mapping(source = "createdAt", target = "createdAt", qualifiedByName = "formatDateTime")
  CarTransferResponse toResponse(CarTransfer carTransfer);

  @Mapping(target = "id", ignore = true)
  @Mapping(target = "car", ignore = true)
  @Mapping(target = "fromShowroom", ignore = true)
  @Mapping(target = "toShowroom", ignore = true)
  @Mapping(target = "createdByEmployeeId", ignore = true)
  @Mapping(target = "transferDate", ignore = true)
  @Mapping(target = "actualReceiveDate", ignore = true)
  @Mapping(target = "status", ignore = true)
  @Mapping(target = "createdAt", ignore = true)
  @Mapping(target = "updatedAt", ignore = true)
  @Mapping(target = "createdBy", ignore = true)
  @Mapping(target = "updatedBy", ignore = true)
  CarTransfer toEntity(CarTransferRequest request);
}
