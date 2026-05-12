package com.g7auto.application.service;

import com.g7auto.application.dto.request.CarModelRequest;
import com.g7auto.application.dto.request.CarModelSearchRequest;
import com.g7auto.application.dto.response.CarModelResponse;
import com.g7auto.application.dto.response.ImportResult;
import com.g7auto.core.response.Page;
import jakarta.servlet.http.HttpServletResponse;
import java.util.List;
import org.springframework.web.multipart.MultipartFile;

public interface CarModelService {

  Page<CarModelResponse> search(CarModelSearchRequest request);

  List<CarModelResponse> findAllList();

  CarModelResponse findById(Long id);

  CarModelResponse create(CarModelRequest request);

  CarModelResponse update(Long id, CarModelRequest request);

  void delete(Long id);

  ImportResult importCarModels(MultipartFile file);

  void downloadCarModelTemplate(HttpServletResponse response);

  void exportCarModels(HttpServletResponse response);
}
