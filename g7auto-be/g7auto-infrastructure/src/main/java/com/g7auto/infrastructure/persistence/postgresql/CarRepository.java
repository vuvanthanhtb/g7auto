package com.g7auto.infrastructure.persistence.postgresql;

import com.g7auto.core.entity.CarStatus;
import com.g7auto.domain.entity.Car;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CarRepository extends JpaRepository<Car, Long> {

  boolean existsByChassisNumber(String chassisNumber);

  boolean existsByEngineNumber(String engineNumber);

  List<Car> findByStatus(CarStatus status);
}
