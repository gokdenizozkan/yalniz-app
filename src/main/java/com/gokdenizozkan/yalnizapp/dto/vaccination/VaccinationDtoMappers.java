package com.gokdenizozkan.yalnizapp.dto.vaccination;

import com.gokdenizozkan.yalnizapp.dto.vaccination.mapper.VaccinationResponseMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class VaccinationDtoMappers {
    public final VaccinationResponseMapper toResponse;
}
