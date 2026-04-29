package com.g7auto.infrastructure.persistence;

import com.g7auto.domain.entity.Payment;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {

  List<Payment> findByContractIdOrderByInstallmentNumber(Long contractId);

  int countByContractId(Long contractId);
}
