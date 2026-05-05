package com.g7auto.infrastructure.persistence;

import com.g7auto.core.entity.ApprovingStatus;
import com.g7auto.domain.entity.AccountApproving;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountApprovingRepository extends JpaRepository<AccountApproving, Long> {

  Optional<AccountApproving> findByUsername(String username);

  Optional<AccountApproving> findByUsernameAndStatusApproving(String username,
      ApprovingStatus action);

  boolean existsByUsername(String username);
}
