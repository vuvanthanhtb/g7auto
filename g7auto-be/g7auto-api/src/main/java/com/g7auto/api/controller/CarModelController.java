package com.g7auto.api.controller;

import com.g7auto.application.dto.request.CarModelRequest;
import com.g7auto.application.dto.request.CarModelSearchRequest;
import com.g7auto.application.dto.response.CarModelResponse;
import com.g7auto.application.dto.response.ImportResult;
import com.g7auto.application.service.CarModelService;
import com.g7auto.core.response.ApiResponse;
import com.g7auto.core.response.PageResponse;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/car-models")
@RequiredArgsConstructor
public class CarModelController {

  private final CarModelService carModelService;

  @GetMapping
  public ResponseEntity<ApiResponse<PageResponse<CarModelResponse>>> search(
      @ModelAttribute CarModelSearchRequest request) {
    return ResponseEntity.ok(ApiResponse.ok(carModelService.search(request)));
  }

  @GetMapping("/{id}")
  public ResponseEntity<ApiResponse<CarModelResponse>> getById(@PathVariable Long id) {
    return ResponseEntity.ok(ApiResponse.ok(carModelService.findById(id)));
  }

  @PostMapping
  public ResponseEntity<ApiResponse<CarModelResponse>> create(@RequestBody CarModelRequest req) {
    return ResponseEntity.status(HttpStatus.CREATED)
        .body(ApiResponse.ok(carModelService.create(req)));
  }

  @PutMapping("/{id}")
  public ResponseEntity<ApiResponse<CarModelResponse>> update(@PathVariable Long id,
      @RequestBody CarModelRequest req) {
    return ResponseEntity.ok(ApiResponse.ok(carModelService.update(id, req)));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
    carModelService.delete(id);
    return ResponseEntity.ok(ApiResponse.ok(null));
  }

  @PostMapping("/import")
  public ResponseEntity<ApiResponse<ImportResult>> importCarModels(
      @RequestParam("file") MultipartFile file) {
    return ResponseEntity.ok(ApiResponse.ok(carModelService.importCarModels(file)));
  }

  @GetMapping("/template")
  public void downloadTemplate(HttpServletResponse response) {
    carModelService.downloadCarModelTemplate(response);
  }
}
