package com.g7auto.application.mapper;

import com.g7auto.application.dto.request.AccountRequest;
import com.g7auto.application.dto.response.AccountExportResponse;
import com.g7auto.application.dto.response.AccountResponse;
import com.g7auto.core.entity.Role;
import com.g7auto.domain.entity.Account;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(config = BaseMapperConfig.class)
public interface AccountMapper {

  @Mapping(source = "status", target = "status", resultType = String.class)
  @Mapping(source = "createdAt", target = "createdAt", qualifiedByName = "formatDateTime")
  @Mapping(source = "updatedAt", target = "updatedAt", qualifiedByName = "formatDateTime")
  AccountResponse toResponse(Account account);

  @Mapping(target = "id", ignore = true)
  @Mapping(target = "password", ignore = true)
  @Mapping(target = "status", ignore = true)
  @Mapping(target = "failedLoginAttempts", ignore = true)
  @Mapping(target = "createdAt", ignore = true)
  @Mapping(target = "updatedAt", ignore = true)
  @Mapping(target = "createdBy", ignore = true)
  @Mapping(target = "updatedBy", ignore = true)
  Account toEntity(AccountRequest request);

  AccountExportResponse toExport(Account account);

  @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
  @Mapping(target = "id", ignore = true)
  @Mapping(target = "password", ignore = true)
  @Mapping(target = "status", ignore = true)
  @Mapping(target = "failedLoginAttempts", ignore = true)
  @Mapping(target = "createdAt", ignore = true)
  @Mapping(target = "updatedAt", ignore = true)
  @Mapping(target = "createdBy", ignore = true)
  @Mapping(target = "updatedBy", ignore = true)
  void updateEntity(AccountRequest request, @MappingTarget Account account);

  default String roleToString(Role role) {
    return role == null ? null : role.name();
  }
}
