package com.g7auto.infrastructure.persistence.postgresql;

import com.g7auto.core.entity.ApprovingStatus;
import com.g7auto.domain.entity.EmployeeApproval;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeApprovalRepository extends JpaRepository<EmployeeApproval, Long> {

  Optional<EmployeeApproval> findByEmail(String email);

  Optional<EmployeeApproval> findByUsername(String username);

  Optional<EmployeeApproval> findByUsernameAndStatusApproving(String username,
      ApprovingStatus statusApproving);

  EmployeeApproval findByNationalId(String nationalId);

  @Query("SELECT e.code FROM EmployeeApproval e WHERE e.code IS NOT NULL ORDER BY e.code DESC LIMIT 1")
  Optional<String> findMaxCode();
}
