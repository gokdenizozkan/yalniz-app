package com.gokdenizozkan.yalnizapp.dto.pet;

import com.gokdenizozkan.yalnizapp.dto.pet.mapper.PetResponseMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class PetDtoMappers {
    public final PetResponseMapper toResponse;
}
