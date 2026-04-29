package com.g7auto.infrastructure.persistence;

import com.g7auto.core.entity.QuotationStatus;
import com.g7auto.domain.entity.Quotation;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuotationRepository extends JpaRepository<Quotation, Long> {

  List<Quotation> findByCarIdAndStatusNot(Long carId, QuotationStatus status);
}
