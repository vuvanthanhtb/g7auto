package com.g7auto.api.controller;

import com.g7auto.application.dto.request.CarRequest;
import com.g7auto.application.dto.request.CarSearchRequest;
import com.g7auto.application.dto.request.CarUpdateRequest;
import com.g7auto.application.dto.response.CarImportResultResponse;
import com.g7auto.application.dto.response.CarResponse;
import com.g7auto.application.service.CarService;
import com.g7auto.core.response.ApiResponse;
import com.g7auto.core.response.Page;
import java.util.List;
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
@RequestMapping("/api/cars")
@RequiredArgsConstructor
public class CarController {

  private final CarService carService;

  @GetMapping("/list")
  public ResponseEntity<ApiResponse<List<CarResponse>>> getAvailable() {
    return ResponseEntity.ok(ApiResponse.ok(carService.getAvailable()));
  }

  @GetMapping
  public ResponseEntity<ApiResponse<Page<CarResponse>>> search(
      @ModelAttribute CarSearchRequest request) {
    return ResponseEntity.ok(ApiResponse.ok(carService.search(request)));
  }

  @GetMapping("/{id}")
  public ResponseEntity<ApiResponse<CarResponse>> getById(@PathVariable Long id) {
    return ResponseEntity.ok(ApiResponse.ok(carService.findById(id)));
  }

  @PostMapping
  public ResponseEntity<ApiResponse<CarResponse>> create(@RequestBody CarRequest req) {
    return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.ok(carService.create(req)));
  }

  @PutMapping("/{id}")
  public ResponseEntity<ApiResponse<CarResponse>> update(@PathVariable Long id,
      @RequestBody CarUpdateRequest req) {
    return ResponseEntity.ok(ApiResponse.ok(carService.update(id, req)));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
    carService.delete(id);
    return ResponseEntity.ok(ApiResponse.ok(null));
  }

  @GetMapping("/export")
  public void exportCars(HttpServletResponse response) {
    carService.exportCars(response);
  }

  @PostMapping("/import")
  public ResponseEntity<ApiResponse<CarImportResultResponse>> importCars(
      @RequestParam("file") MultipartFile file) {
    return ResponseEntity.ok(ApiResponse.ok(carService.importCars(file)));
  }

  @GetMapping("/import/template")
  public void downloadTemplate(HttpServletResponse response) {
    carService.downloadTemplate(response);
  }
}
