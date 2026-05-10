package com.g7auto.application.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateProfileRequest {

  private String fullName;
  private String email;
}
