package com.gokdenizozkan.yalnizapp.layer.repository;

import com.gokdenizozkan.yalnizapp.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    List<Appointment> findAllByVetIdAndStartBetween(Long vetId, LocalDateTime start, LocalDateTime end);

    List<Appointment> findAllByPetIdAndStartBetween(Long petId, LocalDateTime start, LocalDateTime end);

    Boolean existsByVetIdAndStartBetween(Long vetId, LocalDateTime start, LocalDateTime end);
}
