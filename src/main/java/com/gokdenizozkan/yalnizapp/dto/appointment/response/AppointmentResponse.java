package com.gokdenizozkan.yalnizapp.dto.appointment.response;

import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

import java.time.LocalDateTime;

public record AppointmentResponse(
        Long id,
        @Temporal(TemporalType.TIMESTAMP)
        LocalDateTime start,
        @Temporal(TemporalType.TIMESTAMP)
        LocalDateTime end,
        Long petId,
        Long vetId
) {
}
