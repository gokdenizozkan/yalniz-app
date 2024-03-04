package com.gokdenizozkan.yalnizapp.dto.appointment.response;

import java.time.LocalDateTime;

public record AppointmentResponse(
        Long id,
        LocalDateTime start,
        LocalDateTime end,
        Long petId,
        Long vetId
) {
}
