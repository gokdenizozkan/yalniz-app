package com.gokdenizozkan.yalnizapp.layer.service;

import com.gokdenizozkan.yalnizapp.config.datastructure.Pair;
import com.gokdenizozkan.yalnizapp.config.exception.ResourceNotFoundException;
import com.gokdenizozkan.yalnizapp.config.response.Data;
import com.gokdenizozkan.yalnizapp.dto.appointment.AppointmentEntityMappers;
import com.gokdenizozkan.yalnizapp.dto.appointment.request.AppointmentSaveRequest;
import com.gokdenizozkan.yalnizapp.dto.appointment.request.AppointmentUpdateRequest;
import com.gokdenizozkan.yalnizapp.entity.Appointment;
import com.gokdenizozkan.yalnizapp.layer.repository.AppointmentRepository;
import com.gokdenizozkan.yalnizapp.layer.repository.WorkdayRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AppointmentService {
    private final AppointmentRepository repository;
    private final AppointmentEntityMappers entityMappers;
    private final WorkdayRepository workdayRepository;

    public List<Appointment> findAll() {
        return repository.findAll();
    }

    public List<Appointment> findAllByVetIdAndStartBetween(Long vetId, String startDate, String endDate) {
        LocalDateTime start = LocalDateTime.parse(startDate);
        LocalDateTime end = LocalDateTime.parse(endDate);

        return repository.findAllByVetIdAndStartBetween(vetId, start, end);
    }

    public List<Appointment> findAllByPetIdAndStartBetween(Long petId, String startDate, String endDate) {
        LocalDateTime start = LocalDateTime.parse(startDate);
        LocalDateTime end = LocalDateTime.parse(endDate);

        return repository.findAllByPetIdAndStartBetween(petId, start, end);
    }

    public Appointment save(AppointmentSaveRequest request) {
        Long vetId = request.vetId();

        boolean vetNotWorking = !workdayRepository.existsByVetIdAndDate(vetId, request.start().toLocalDate());
        if (vetNotWorking) throw new IllegalArgumentException("Vet is not working on " + request.start().toLocalDate());

        boolean vetNotAvailable = repository.existsByVetIdAndStartBetween(vetId, request.start(), request.start().plusHours(1));
        if (vetNotAvailable) throw new IllegalArgumentException("Vet is not available between " + request.start() + " and " + request.start().plusHours(1));

        Appointment appointment = entityMappers.fromSaveRequest.apply(request);
        return repository.save(appointment);
    }

    public Appointment update(Long id, AppointmentUpdateRequest request) {
        boolean vetNotWorking = !workdayRepository.existsByVetIdAndDate(request.vetId(), request.start().toLocalDate());
        if (vetNotWorking) throw new IllegalArgumentException("Vet is not working on " + request.start().toLocalDate());

        boolean vetNotAvailable = repository.existsByVetIdAndStartBetween(request.vetId(), request.start(), request.start().plusHours(1));
        if (vetNotAvailable) throw new IllegalArgumentException("Vet is not available between " + request.start() + " and " + request.start().plusHours(1));

        Appointment updatedAppointment = entityMappers.fromUpdateRequest.apply(request);
        return repository.save(updatedAppointment);
    }

    public void deleteById(Long id) {
        Appointment appointment = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Appointment not found with id " + id));

        repository.deleteById(id);
        repository.flush();
    }

    public Appointment findById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Appointment not found with id " + id));
    }
}