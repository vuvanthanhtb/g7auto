package com.g7auto.application.service;

import com.g7auto.application.dto.request.CarRequest;
import com.g7auto.application.dto.request.CarSearchRequest;
import com.g7auto.application.dto.request.CarUpdateRequest;
import com.g7auto.application.dto.response.CarResponse;
import com.g7auto.core.response.PageResponse;
import jakarta.servlet.http.HttpServletResponse;

public interface CarService {

  PageResponse<CarResponse> search(CarSearchRequest request);

  CarResponse findById(Long id);

  CarResponse create(CarRequest request);

  CarResponse update(Long id, CarUpdateRequest request);

  void delete(Long id);

  void exportCars(HttpServletResponse response);
}
