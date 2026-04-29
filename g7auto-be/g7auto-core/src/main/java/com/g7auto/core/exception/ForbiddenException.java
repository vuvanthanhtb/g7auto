package com.g7auto.core.exception;

import lombok.Getter;

@Getter
public class ForbiddenException extends RuntimeException {

  public ForbiddenException(String message) {
    super(message);
  }
}
