package com.gokdenizozkan.yalnizapp.dto.vet;

import com.gokdenizozkan.yalnizapp.dto.vet.mapper.VetResponseMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class VetDtoMappers {
    public final VetResponseMapper toResponse;
}
