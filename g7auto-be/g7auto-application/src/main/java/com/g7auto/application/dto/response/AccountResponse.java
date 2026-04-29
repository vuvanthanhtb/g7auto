package com.g7auto.application.dto.response;

import java.util.List;

public record AccountResponse(
    Long id,
    String username,
    String email,
    String fullName,
    List<String> roles,
    String status,
    String createdAt,
    String updatedAt,
    String createdBy,
    String updatedBy
) {

}
