package com.g7auto.application.service;

import com.g7auto.application.dto.request.ShowroomRequest;
import com.g7auto.application.dto.request.ShowroomSearchRequest;
import com.g7auto.application.dto.response.ImportResult;
import com.g7auto.application.dto.response.ShowroomResponse;
import com.g7auto.core.response.PageResponse;
import jakarta.servlet.http.HttpServletResponse;
import java.util.List;
import org.springframework.web.multipart.MultipartFile;

public interface ShowroomService {

  PageResponse<ShowroomResponse> search(ShowroomSearchRequest request);

  ShowroomResponse findById(Long id);

  ShowroomResponse create(ShowroomRequest request);

  ShowroomResponse update(Long id, ShowroomRequest request);

  void delete(Long id);

  List<ShowroomResponse> findAllList();

  ImportResult importShowrooms(MultipartFile file);

  void downloadShowroomTemplate(HttpServletResponse response);

  void exportShowrooms(HttpServletResponse response);
}
