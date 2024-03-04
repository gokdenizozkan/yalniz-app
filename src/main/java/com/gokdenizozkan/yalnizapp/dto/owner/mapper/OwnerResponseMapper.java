package com.gokdenizozkan.yalnizapp.dto.owner.mapper;

import com.gokdenizozkan.yalnizapp.dto.owner.response.OwnerResponse;
import com.gokdenizozkan.yalnizapp.dto.pet.PetDtoMappers;
import com.gokdenizozkan.yalnizapp.entity.Owner;
import com.gokdenizozkan.yalnizapp.layer.repository.PetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.function.Function;

@Component
@RequiredArgsConstructor
public class OwnerResponseMapper implements Function<Owner, OwnerResponse> {
    private final PetRepository petRepository;
    private final PetDtoMappers petDtoMappers;

    @Override
    public OwnerResponse apply(Owner owner) {
        return new OwnerResponse(
                owner.getId(),
                owner.getName(),
                owner.getPhone(),
                owner.getEmail(),
                owner.getAddress(),
                owner.getCity(),
                petRepository.findAllByOwnerId(owner.getId())
                        .stream().map(petDtoMappers.toResponse).toList()
        );
    }
}
