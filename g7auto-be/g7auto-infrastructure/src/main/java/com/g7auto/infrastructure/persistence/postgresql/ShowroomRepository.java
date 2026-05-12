package com.g7auto.infrastructure.persistence.postgresql;

import com.g7auto.core.entity.ShowroomStatus;
import com.g7auto.domain.entity.Showroom;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShowroomRepository extends JpaRepository<Showroom, Long> {

  boolean existsByName(String name);

  Optional<Showroom> findByName(String name);

  List<Showroom> findAllByStatus(ShowroomStatus status);
}
