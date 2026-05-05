package com.g7auto.infrastructure.persistence;

import com.g7auto.core.entity.ApprovingStatus;
import com.g7auto.domain.entity.EmployeeApproval;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeApprovalRepository extends JpaRepository<EmployeeApproval, Long> {

  Optional<EmployeeApproval> findByEmail(String email);

  Optional<EmployeeApproval> findByUsername(String username);

  Optional<EmployeeApproval> findByUsernameAndStatusApproving(String username,
      ApprovingStatus statusApproving);

  EmployeeApproval findByNationalId(String nationalId);
}
