package com.gokdenizozkan.yalnizapp.dto.vaccination.response;

import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

import java.time.LocalDate;

public record VaccinationResponse(
        Long id,
        String name,
        String code,
        @Temporal(TemporalType.DATE)
        LocalDate administrationDate,
        @Temporal(TemporalType.DATE)
        LocalDate expirationDate,
        Long petId
) {}
