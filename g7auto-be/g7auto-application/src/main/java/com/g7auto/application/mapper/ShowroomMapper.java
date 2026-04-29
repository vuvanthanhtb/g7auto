package com.g7auto.application.mapper;

import com.g7auto.application.dto.request.ShowroomRequest;
import com.g7auto.application.dto.response.ShowroomResponse;
import com.g7auto.domain.entity.Showroom;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(config = BaseMapperConfig.class)
public interface ShowroomMapper {

  @Mapping(source = "createdAt", target = "createdAt", qualifiedByName = "formatDateTime")
  @Mapping(source = "updatedAt", target = "updatedAt", qualifiedByName = "formatDateTime")
  ShowroomResponse toResponse(Showroom showroom);

  @Mapping(target = "id", ignore = true)
  @Mapping(target = "status", ignore = true)
  @Mapping(target = "createdAt", ignore = true)
  @Mapping(target = "updatedAt", ignore = true)
  @Mapping(target = "createdBy", ignore = true)
  @Mapping(target = "updatedBy", ignore = true)
  Showroom toEntity(ShowroomRequest request);

  @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
  @Mapping(target = "id", ignore = true)
  @Mapping(target = "status", ignore = true)
  @Mapping(target = "createdAt", ignore = true)
  @Mapping(target = "updatedAt", ignore = true)
  @Mapping(target = "createdBy", ignore = true)
  @Mapping(target = "updatedBy", ignore = true)
  void updateEntity(ShowroomRequest request, @MappingTarget Showroom showroom);
}
