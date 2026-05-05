package com.g7auto.api.controller;

import com.g7auto.application.dto.request.ShowroomRequest;
import com.g7auto.application.dto.request.ShowroomSearchRequest;
import com.g7auto.application.dto.response.ImportResult;
import com.g7auto.application.dto.response.ShowroomResponse;
import com.g7auto.application.service.ShowroomService;
import com.g7auto.core.response.ApiResponse;
import com.g7auto.core.response.PageResponse;
import jakarta.servlet.http.HttpServletResponse;
import java.util.List;
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
@RequestMapping("/api/showrooms")
@RequiredArgsConstructor
public class ShowroomController {

  private final ShowroomService showroomService;

  @GetMapping
  public ResponseEntity<ApiResponse<PageResponse<ShowroomResponse>>> search(
      @ModelAttribute ShowroomSearchRequest request) {
    return ResponseEntity.ok(ApiResponse.ok(showroomService.search(request)));
  }

  @GetMapping("/all")
  public ResponseEntity<ApiResponse<List<ShowroomResponse>>> getList() {
    return ResponseEntity.ok(ApiResponse.ok(showroomService.findAllList()));
  }

  @GetMapping("/{id}")
  public ResponseEntity<ApiResponse<ShowroomResponse>> getById(@PathVariable Long id) {
    return ResponseEntity.ok(ApiResponse.ok(showroomService.findById(id)));
  }

  @PostMapping
  public ResponseEntity<ApiResponse<ShowroomResponse>> create(@RequestBody ShowroomRequest req) {
    return ResponseEntity.status(HttpStatus.CREATED)
        .body(ApiResponse.ok(showroomService.create(req)));
  }

  @PutMapping("/{id}")
  public ResponseEntity<ApiResponse<ShowroomResponse>> update(@PathVariable Long id,
      @RequestBody ShowroomRequest req) {
    return ResponseEntity.ok(ApiResponse.ok(showroomService.update(id, req)));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
    showroomService.delete(id);
    return ResponseEntity.ok(ApiResponse.ok(null));
  }

  @PostMapping("/import")
  public ResponseEntity<ApiResponse<ImportResult>> importShowrooms(
      @RequestParam("file") MultipartFile file) {
    return ResponseEntity.ok(ApiResponse.ok(showroomService.importShowrooms(file)));
  }

  @GetMapping("/template")
  public void downloadTemplate(HttpServletResponse response) {
    showroomService.downloadShowroomTemplate(response);
  }
}
