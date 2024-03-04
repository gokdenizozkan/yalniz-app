package com.gokdenizozkan.yalnizapp.dto.vet;

import com.gokdenizozkan.yalnizapp.dto.vet.mapper.VetSaveRequestDemapper;
import com.gokdenizozkan.yalnizapp.dto.vet.mapper.VetUpdateRequestDemapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class VetEntityMappers {
    public final VetSaveRequestDemapper fromSaveRequest;
    public final VetUpdateRequestDemapper fromUpdateRequest;
}
