package com.gokdenizozkan.yalnizapp.dto.pet.response;

import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

import java.time.LocalDate;

public record PetResponse(
        Long id,
        String name,
        String species,
        String breed,
        String gender,
        String color,
        @Temporal(TemporalType.DATE)
        LocalDate birthdate,
        Long ownerId
) {
}
