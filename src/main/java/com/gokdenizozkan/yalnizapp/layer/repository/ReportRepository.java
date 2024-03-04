package com.gokdenizozkan.yalnizapp.layer.repository;

import com.gokdenizozkan.yalnizapp.entity.Report;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface ReportRepository extends JpaRepository<Report, Long> {
}
