package com.gokdenizozkan.yalnizapp.dto.pet;

import com.gokdenizozkan.yalnizapp.dto.pet.mapper.PetSaveRequestDemapper;
import com.gokdenizozkan.yalnizapp.dto.pet.mapper.PetUpdateRequestDemapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class PetEntityMappers {
    public final PetSaveRequestDemapper fromSaveRequest;
    public final PetUpdateRequestDemapper fromUpdateRequest;
}
