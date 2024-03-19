package com.gokdenizozkan.yalnizapp.dto.appointment.response;

import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

import java.time.LocalDateTime;

public record AppointmentResponse(
        Long id,
        String start,
        String end,
        Long petId,
        Long vetId
) {
}
