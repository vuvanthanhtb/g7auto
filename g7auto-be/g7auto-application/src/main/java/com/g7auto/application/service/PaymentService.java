package com.g7auto.application.service;

import com.g7auto.application.dto.request.PaymentRequest;
import com.g7auto.application.dto.response.PaymentResponse;
import jakarta.servlet.http.HttpServletResponse;
import java.util.List;

public interface PaymentService {

  List<PaymentResponse> findByContract(Long contractId);

  PaymentResponse findById(Long id);

  PaymentResponse create(PaymentRequest paymentRequest);

  PaymentResponse confirm(Long id);

  PaymentResponse cancel(Long id);

  void exportPayments(HttpServletResponse response);
}
