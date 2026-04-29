package com.g7auto.application.dto.response;

import java.util.List;

public record AccountApprovingResponse(
    Long id,
    String username,
    String email,
    String fullName,
    List<String> roles,
    String status,
    String statusApproving,
    String action,
    String createdAt,
    String updatedAt,
    String createdBy,
    String updatedBy
) {

}
