package com.g7auto.application.mapper;

import com.g7auto.application.dto.request.AccountRequest;
import com.g7auto.application.dto.response.AccountApprovingResponse;
import com.g7auto.core.entity.Role;
import com.g7auto.domain.entity.Account;
import com.g7auto.domain.entity.AccountApproving;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(config = BaseMapperConfig.class)
public interface AccountApprovingMapper {

  @Mapping(source = "createdAt", target = "createdAt", qualifiedByName = "formatDateTime")
  @Mapping(source = "updatedAt", target = "updatedAt", qualifiedByName = "formatDateTime")
  AccountApprovingResponse toResponse(AccountApproving accountApproving);

  @Mapping(source = "statusApproving", target = "statusApproving", resultType = String.class)
  @Mapping(source = "action", target = "action", resultType = String.class)
  @Mapping(source = "createdAt", target = "createdAt", qualifiedByName = "formatDateTime")
  @Mapping(source = "updatedAt", target = "updatedAt", qualifiedByName = "formatDateTime")
  AccountApprovingResponse toApprovingResponse(AccountApproving accountApproving);

  @Mapping(target = "id", ignore = true)
  @Mapping(target = "password", ignore = true)
  @Mapping(target = "createdAt", ignore = true)
  @Mapping(target = "updatedAt", ignore = true)
  @Mapping(target = "updatedBy", ignore = true)
  AccountApproving toEntity(AccountRequest request);

  @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
  @Mapping(target = "id", ignore = true)
  @Mapping(target = "createdAt", ignore = true)
  @Mapping(target = "updatedAt", ignore = true)
  @Mapping(target = "createdBy", ignore = true)
  @Mapping(target = "updatedBy", ignore = true)
  void mapAccountToEntity(Account account, @MappingTarget AccountApproving accountApproving);

  default String roleToString(Role role) {
    return role == null ? null : role.name();
  }
}
