package com.g7auto.infrastructure.persistence;

import com.g7auto.domain.entity.Showroom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShowroomRepository extends JpaRepository<Showroom, Long> {

  boolean existsByName(String name);
}
