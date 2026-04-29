package com.g7auto.api.advice;

import com.g7auto.core.constant.codes.AuthErrorCode;
import com.g7auto.core.constant.codes.SystemErrorCode;
import com.g7auto.core.exception.BadRequestException;
import com.g7auto.core.exception.ConflictException;
import com.g7auto.core.exception.ForbiddenException;
import com.g7auto.core.exception.NotFoundException;
import com.g7auto.core.response.ApiResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.authorization.AuthorizationDeniedException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

  @ExceptionHandler(MethodArgumentTypeMismatchException.class)
  public ResponseEntity<ApiResponse<Void>> handleTypeMismatch(
      MethodArgumentTypeMismatchException ex) {
    log.error("BAD_REQUEST", ex);
    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
        .body(ApiResponse.error(HttpStatus.BAD_REQUEST.value(),
            SystemErrorCode.G7_AUTO_00102));
  }

  @ExceptionHandler({BadRequestException.class, IllegalArgumentException.class})
  public ResponseEntity<ApiResponse<Void>> handleBadRequest(
      RuntimeException ex) {
    log.error("BAD_REQUEST", ex);
    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
        .body(
            ApiResponse.error(HttpStatus.BAD_REQUEST.value(), ex.getMessage()));
  }

  @ExceptionHandler(ConflictException.class)
  public ResponseEntity<ApiResponse<Void>> handleConflict(
      ConflictException ex) {
    log.error("CONFLICT", ex);
    return ResponseEntity.status(HttpStatus.CONFLICT)
        .body(ApiResponse.error(HttpStatus.CONFLICT.value(), ex.getMessage()));
  }

  @ExceptionHandler(NotFoundException.class)
  public ResponseEntity<ApiResponse<Void>> handleNotFound(
      NotFoundException ex) {
    log.error("NOT_FOUND", ex);
    return ResponseEntity.status(HttpStatus.NOT_FOUND)
        .body(ApiResponse.error(HttpStatus.NOT_FOUND.value(), ex.getMessage()));
  }

  @ExceptionHandler({BadCredentialsException.class,
      UsernameNotFoundException.class})
  public ResponseEntity<ApiResponse<Void>> handleBadCredentials(
      RuntimeException ex) {
    log.error("UNAUTHORIZED", ex);
    return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
        .body(ApiResponse.error(HttpStatus.UNAUTHORIZED.value(),
            AuthErrorCode.G7_AUTO_00200));
  }

  @ExceptionHandler(LockedException.class)
  public ResponseEntity<ApiResponse<Void>> handleLocked(LockedException ex) {
    log.error("UNAUTHORIZED", ex);
    return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
        .body(ApiResponse.error(HttpStatus.UNAUTHORIZED.value(),
            AuthErrorCode.G7_AUTO_00201));
  }

  @ExceptionHandler(DisabledException.class)
  public ResponseEntity<ApiResponse<Void>> handleDisabled(
      DisabledException ex) {
    log.error("UNAUTHORIZED", ex);
    return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
        .body(ApiResponse.error(HttpStatus.UNAUTHORIZED.value(),
            AuthErrorCode.G7_AUTO_00205));
  }

  @ExceptionHandler({AuthorizationDeniedException.class,
      ForbiddenException.class})
  public ResponseEntity<ApiResponse<Void>> handleForbidden(
      RuntimeException ex) {
    log.error("FORBIDDEN", ex);
    return ResponseEntity.status(HttpStatus.FORBIDDEN)
        .body(ApiResponse.error(HttpStatus.FORBIDDEN.value(),
            AuthErrorCode.G7_AUTO_00202));
  }

  @ExceptionHandler(Exception.class)
  public ResponseEntity<ApiResponse<Void>> handleGeneric(Exception ex) {
    log.error("Unhandled exception", ex);
    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
        .body(ApiResponse.error(HttpStatus.INTERNAL_SERVER_ERROR.value(),
            SystemErrorCode.G7_AUTO_00100));
  }
}
