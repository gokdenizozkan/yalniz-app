package com.gokdenizozkan.yalnizapp.dto.appointment.mapper;

import com.gokdenizozkan.yalnizapp.config.exception.ResourceNotFoundException;
import com.gokdenizozkan.yalnizapp.dto.appointment.request.AppointmentUpdateRequest;
import com.gokdenizozkan.yalnizapp.entity.Appointment;
import com.gokdenizozkan.yalnizapp.layer.repository.AppointmentRepository;
import com.gokdenizozkan.yalnizapp.layer.repository.PetRepository;
import com.gokdenizozkan.yalnizapp.layer.repository.VetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.function.Function;

@Component
@RequiredArgsConstructor
public class AppointmentUpdateRequestDemapper implements Function<AppointmentUpdateRequest, Appointment> {
    private final AppointmentRepository repository;
    private final PetRepository petRepository;
    private final VetRepository vetRepository;

    @Override
    public Appointment apply(AppointmentUpdateRequest appointmentUpdateRequest) {
        Appointment appointment = repository.findById(appointmentUpdateRequest.id())
                .orElseThrow(() -> new ResourceNotFoundException("Appointment not found with id " + appointmentUpdateRequest.id()));

        appointment.setId(appointmentUpdateRequest.id());
        appointment.setStart(appointmentUpdateRequest.start());
        appointment.setEnd(appointmentUpdateRequest.start().plusHours(1));
        appointment.setVet(vetRepository.findById(appointmentUpdateRequest.vetId())
                .orElseThrow(() -> new ResourceNotFoundException("Vet not found with id " + appointmentUpdateRequest.vetId())));
        appointment.setPet(petRepository.findById(appointmentUpdateRequest.petId())
                .orElseThrow(() -> new ResourceNotFoundException("Pet not found with id " + appointmentUpdateRequest.petId())));

        return appointment;
    }
}
