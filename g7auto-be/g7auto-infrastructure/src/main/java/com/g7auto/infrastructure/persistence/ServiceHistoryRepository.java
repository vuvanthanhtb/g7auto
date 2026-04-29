package com.g7auto.infrastructure.persistence;

import com.g7auto.domain.entity.ServiceHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ServiceHistoryRepository extends
    JpaRepository<ServiceHistory, Long> {

}
