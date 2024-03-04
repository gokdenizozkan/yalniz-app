package com.gokdenizozkan.yalnizapp.dto.vaccination;

import com.gokdenizozkan.yalnizapp.dto.vaccination.mapper.VaccinationSaveRequestDemapper;
import com.gokdenizozkan.yalnizapp.dto.vaccination.mapper.VaccinationUpdateRequestDemapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class VaccinationEntityMappers {
    public final VaccinationSaveRequestDemapper fromSaveRequest;
    public final VaccinationUpdateRequestDemapper fromUpdateRequest;
}
