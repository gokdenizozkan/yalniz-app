package com.gokdenizozkan.yalnizapp.dto.workday.response;

import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

import java.time.LocalDate;

public record WorkdayResponse(
        Long id,
        @Temporal(TemporalType.DATE)
        LocalDate date,
        Long vetId
) {
}
