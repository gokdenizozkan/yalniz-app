package com.gokdenizozkan.yalnizapp.dto.vet.mapper;

import com.gokdenizozkan.yalnizapp.config.exception.ResourceNotFoundException;
import com.gokdenizozkan.yalnizapp.dto.vet.request.VetUpdateRequest;
import com.gokdenizozkan.yalnizapp.entity.Vet;
import com.gokdenizozkan.yalnizapp.layer.repository.VetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.function.Function;

@Component
@RequiredArgsConstructor
public class VetUpdateRequestDemapper implements Function<VetUpdateRequest, Vet> {
    private final VetRepository repository;

    @Override
    public Vet apply(VetUpdateRequest vetUpdateRequest) {
        Vet vet = repository.findById(vetUpdateRequest.id())
                .orElseThrow(() -> new ResourceNotFoundException("Vet not found with id " + vetUpdateRequest.id()));

        vet.setId(vetUpdateRequest.id());
        vet.setName(vetUpdateRequest.name());
        vet.setPhone(vetUpdateRequest.phone());
        vet.setEmail(vetUpdateRequest.email());
        vet.setAddress(vetUpdateRequest.address());
        vet.setCity(vetUpdateRequest.city());

        return vet;
    }
}
