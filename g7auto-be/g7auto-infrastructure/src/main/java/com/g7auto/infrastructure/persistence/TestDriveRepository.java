package com.g7auto.infrastructure.persistence;

import com.g7auto.domain.entity.TestDrive;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface TestDriveRepository extends JpaRepository<TestDrive, Long> {

  @Query("SELECT t FROM TestDrive t WHERE t.car.id = :carId AND t.status IN ('PENDING','CONFIRMED') AND t.startTime < :endTime AND t.endTime > :startTime")
  List<TestDrive> findConflicting(@Param("carId") Long carId,
      @Param("startTime") LocalDateTime startTime,
      @Param("endTime") LocalDateTime endTime);
}
