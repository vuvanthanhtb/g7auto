package com.g7auto.infrastructure.persistence;

import com.g7auto.domain.entity.Contract;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface ContractRepository extends JpaRepository<Contract, Long>,
    JpaSpecificationExecutor<Contract> {

  Optional<Contract> findByContractNumber(String contractNumber);

  boolean existsByContractNumber(String contractNumber);

  @Query("SELECT COUNT(c) FROM Contract c")
  long countAll();
}
