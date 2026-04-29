package com.g7auto.infrastructure.persistence;

import com.g7auto.domain.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {

  boolean existsByPhone(String phone);
}
