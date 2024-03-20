package com.gokdenizozkan.yalnizapp.dto.vaccination.response;

import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

import java.time.LocalDate;

public record VaccinationResponse(
        Long id,
        String name,
        String code,
        String administrationDate,
        String expirationDate,
        Long petId,
        Long reportId
) {}
