package com.gokdenizozkan.yalnizapp.dto.workday.response;

import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

import java.time.LocalDate;

public record WorkdayResponse(
        Long id,
        String date,
        Long vetId
) {
}
