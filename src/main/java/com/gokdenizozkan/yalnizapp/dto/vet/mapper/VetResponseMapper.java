package com.gokdenizozkan.yalnizapp.dto.vet.mapper;

import com.gokdenizozkan.yalnizapp.dto.vet.response.VetResponse;
import com.gokdenizozkan.yalnizapp.entity.Vet;
import org.springframework.stereotype.Component;

import java.util.function.Function;

@Component
public class VetResponseMapper implements Function<Vet, VetResponse> {
    @Override
    public VetResponse apply(Vet vet) {
        return new VetResponse(
                vet.getId(),
                vet.getName(),
                vet.getPhone(),
                vet.getEmail(),
                vet.getAddress(),
                vet.getCity()
        );
    }
}
