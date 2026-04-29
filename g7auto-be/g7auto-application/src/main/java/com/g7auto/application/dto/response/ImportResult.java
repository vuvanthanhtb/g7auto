package com.g7auto.application.dto.response;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ImportResult {

  private int total;
  private int success;
  private int failed;
  private List<String> errors;
}
