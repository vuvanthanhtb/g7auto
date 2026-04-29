package com.g7auto.infrastructure.persistence;

import com.g7auto.domain.entity.Account;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long>,
    JpaSpecificationExecutor<Account> {

  Optional<Account> findByUsername(String username);

  boolean existsByUsername(String username);

  boolean existsByEmail(String email);
}
