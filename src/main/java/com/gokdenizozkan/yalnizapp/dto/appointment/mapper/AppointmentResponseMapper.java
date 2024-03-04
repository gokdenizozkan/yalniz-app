package com.gokdenizozkan.yalnizapp.dto.appointment.mapper;

import com.gokdenizozkan.yalnizapp.dto.appointment.response.AppointmentResponse;
import com.gokdenizozkan.yalnizapp.entity.Appointment;
import org.springframework.stereotype.Component;

import java.util.function.Function;

@Component
public class AppointmentResponseMapper implements Function<Appointment, AppointmentResponse>{
    @Override
    public AppointmentResponse apply(Appointment appointment) {
        return new AppointmentResponse(
                appointment.getId(),
                appointment.getStart(),
                appointment.getEnd(),
                appointment.getPet().getId(),
                appointment.getVet().getId()
        );
    }
}
