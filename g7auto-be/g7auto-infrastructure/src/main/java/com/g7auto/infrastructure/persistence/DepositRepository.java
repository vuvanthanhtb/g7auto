package com.g7auto.infrastructure.persistence;

import com.g7auto.core.entity.DepositStatus;
import com.g7auto.domain.entity.Deposit;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DepositRepository extends JpaRepository<Deposit, Long> {

  List<Deposit> findByCarIdAndStatus(Long carId, DepositStatus status);
}
