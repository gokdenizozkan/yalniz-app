package com.gokdenizozkan.yalnizapp.layer.repository;

import com.gokdenizozkan.yalnizapp.entity.Workday;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;

@Repository
public interface WorkdayRepository extends JpaRepository<Workday, Long> {
    Boolean existsByVetIdAndDate(Long vetId, LocalDate date);
}
