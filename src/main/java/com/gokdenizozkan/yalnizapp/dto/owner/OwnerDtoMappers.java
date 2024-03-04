package com.gokdenizozkan.yalnizapp.dto.owner;

import com.gokdenizozkan.yalnizapp.dto.owner.mapper.OwnerResponseMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class OwnerDtoMappers {
    public final OwnerResponseMapper toResponse;
}
