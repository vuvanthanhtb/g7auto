package com.g7auto.application.config;

import java.time.LocalDate;
import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Data
@Component
@ConfigurationProperties(prefix = "superadmin")
public class SuperAdminProperties {

  private String username;
  private String password;
  private String email;
  private String fullName;
  private String phone;
  private String address;
  private LocalDate birthDate;
  private String gender;
  private String nationalId;
  private LocalDate joinDate;
}
