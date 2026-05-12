package com.g7auto.infrastructure.persistence.postgresql;

import com.g7auto.domain.entity.Employee;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

  Optional<Employee> findByEmail(String email);

  Optional<Employee> findByUsername(String username);

  Optional<Employee> findByNationalId(String nationalId);

  @Query("SELECT e.code FROM Employee e WHERE e.code IS NOT NULL ORDER BY e.code DESC LIMIT 1")
  Optional<String> findMaxCode();
}
