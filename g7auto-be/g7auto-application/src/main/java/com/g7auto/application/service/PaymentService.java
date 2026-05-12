package com.g7auto.application.service;

import com.g7auto.application.dto.request.PaymentRequest;
import com.g7auto.application.dto.request.PaymentSearchRequest;
import com.g7auto.application.dto.response.PaymentResponse;
import com.g7auto.core.response.Page;
import jakarta.servlet.http.HttpServletResponse;
import java.util.List;

public interface PaymentService {

  Page<PaymentResponse> search(PaymentSearchRequest request);

  List<PaymentResponse> findByContract(Long contractId);

  PaymentResponse findById(Long id);

  PaymentResponse create(PaymentRequest paymentRequest);

  PaymentResponse confirm(Long id);

  PaymentResponse cancel(Long id);

  void exportPayments(HttpServletResponse response);
}
