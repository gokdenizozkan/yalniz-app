package com.gokdenizozkan.yalnizapp.dto.appointment;

import com.gokdenizozkan.yalnizapp.dto.appointment.mapper.AppointmentResponseMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AppointmentDtoMappers {
    public final AppointmentResponseMapper toResponse;
}
