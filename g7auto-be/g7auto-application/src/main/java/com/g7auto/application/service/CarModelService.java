package com.g7auto.application.service;

import com.g7auto.application.dto.request.CarModelRequest;
import com.g7auto.application.dto.request.CarModelSearchRequest;
import com.g7auto.application.dto.response.CarModelResponse;
import com.g7auto.application.dto.response.ImportResult;
import com.g7auto.core.response.PageResponse;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.multipart.MultipartFile;

public interface CarModelService {

  PageResponse<CarModelResponse> search(CarModelSearchRequest request);

  CarModelResponse findById(Long id);

  CarModelResponse create(CarModelRequest request);

  CarModelResponse update(Long id, CarModelRequest request);

  void delete(Long id);

  ImportResult importCarModels(MultipartFile file);

  void downloadCarModelTemplate(HttpServletResponse response);

  void exportCarModels(HttpServletResponse response);
}
