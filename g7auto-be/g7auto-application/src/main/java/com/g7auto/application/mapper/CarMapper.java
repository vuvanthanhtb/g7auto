package com.g7auto.application.mapper;

import com.g7auto.application.dto.request.CarRequest;
import com.g7auto.application.dto.request.CarUpdateRequest;
import com.g7auto.application.dto.response.CarResponse;
import com.g7auto.domain.entity.Car;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(config = BaseMapperConfig.class)
public interface CarMapper {

  @Mapping(source = "carModel.id", target = "carModelId")
  @Mapping(source = "carModel.name", target = "carModelName")
  @Mapping(source = "showroom.id", target = "showroomId")
  @Mapping(source = "showroom.name", target = "showroomName")
  @Mapping(source = "createdAt", target = "createdAt", qualifiedByName = "formatDateTime")
  @Mapping(source = "updatedAt", target = "updatedAt", qualifiedByName = "formatDateTime")
  CarResponse toResponse(Car car);

  @Mapping(target = "id", ignore = true)
  @Mapping(target = "carModel", ignore = true)
  @Mapping(target = "showroom", ignore = true)
  @Mapping(target = "status", ignore = true)
  @Mapping(target = "arrivalDate", ignore = true)
  @Mapping(target = "year", ignore = true)
  @Mapping(target = "createdAt", ignore = true)
  @Mapping(target = "updatedAt", ignore = true)
  @Mapping(target = "createdBy", ignore = true)
  @Mapping(target = "updatedBy", ignore = true)
  Car toEntity(CarRequest request);

  @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
  @Mapping(target = "id", ignore = true)
  @Mapping(target = "chassisNumber", ignore = true)
  @Mapping(target = "engineNumber", ignore = true)
  @Mapping(target = "carModel", ignore = true)
  @Mapping(target = "showroom", ignore = true)
  @Mapping(target = "status", ignore = true)
  @Mapping(target = "arrivalDate", ignore = true)
  @Mapping(target = "year", ignore = true)
  @Mapping(target = "createdAt", ignore = true)
  @Mapping(target = "updatedAt", ignore = true)
  @Mapping(target = "createdBy", ignore = true)
  @Mapping(target = "updatedBy", ignore = true)
  void updateEntity(CarUpdateRequest request, @MappingTarget Car car);
}
