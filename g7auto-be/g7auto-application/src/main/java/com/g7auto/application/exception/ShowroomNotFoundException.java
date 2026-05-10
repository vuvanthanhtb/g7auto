package com.g7auto.application.exception;

public class ShowroomNotFoundException extends RuntimeException {

  public ShowroomNotFoundException(Long id) {
    super("Không tìm thấy showroom với id: " + id);
  }
}
