package com.gokdenizozkan.yalnizapp.dto.appointment.mapper;

import com.gokdenizozkan.yalnizapp.config.exception.ResourceNotFoundException;
import com.gokdenizozkan.yalnizapp.dto.appointment.request.AppointmentSaveRequest;
import com.gokdenizozkan.yalnizapp.entity.Appointment;
import com.gokdenizozkan.yalnizapp.layer.repository.PetRepository;
import com.gokdenizozkan.yalnizapp.layer.repository.VetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.function.Function;

@Component
@RequiredArgsConstructor
public class AppointmentSaveRequestDemapper implements Function<AppointmentSaveRequest, Appointment> {
    private final PetRepository petRepository;
    private final VetRepository vetRepository;

    @Override
    public Appointment apply(AppointmentSaveRequest appointmentSaveRequest) {
        Appointment appointment = new Appointment();

        appointment.setStart(appointmentSaveRequest.start());
        appointment.setEnd(appointmentSaveRequest.start().plusHours(1));
        appointment.setVet(vetRepository.findById(appointmentSaveRequest.vetId())
                .orElseThrow(() -> new ResourceNotFoundException("Vet not found with id " + appointmentSaveRequest.vetId())));
        appointment.setPet(petRepository.findById(appointmentSaveRequest.petId())
                .orElseThrow(() -> new ResourceNotFoundException("Pet not found with id " + appointmentSaveRequest.petId())));
        appointment.setReport(null);

        return appointment;
    }
}
