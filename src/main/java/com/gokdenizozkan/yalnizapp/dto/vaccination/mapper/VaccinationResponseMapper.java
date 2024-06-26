package com.gokdenizozkan.yalnizapp.dto.vaccination.mapper;

import com.gokdenizozkan.yalnizapp.dto.vaccination.response.VaccinationResponse;
import com.gokdenizozkan.yalnizapp.entity.Vaccination;
import org.springframework.stereotype.Component;

import java.util.function.Function;

@Component
public class VaccinationResponseMapper implements Function<Vaccination, VaccinationResponse> {
    @Override
    public VaccinationResponse apply(Vaccination vaccination) {
        return new VaccinationResponse(
                vaccination.getId(),
                vaccination.getName(),
                vaccination.getCode(),
                vaccination.getAdministrationDate().toString(),
                vaccination.getExpirationDate().toString(),
                vaccination.getPet().getId(),
                vaccination.getReport().getId()
        );
    }
}
