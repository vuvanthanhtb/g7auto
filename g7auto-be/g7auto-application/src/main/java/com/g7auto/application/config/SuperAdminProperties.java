package com.g7auto.application.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Data
@Component
@ConfigurationProperties(prefix = "superadmin")
public class SuperAdminProperties {

  private String username;
  private String email;
  private String password;
  private String fullName;
}
