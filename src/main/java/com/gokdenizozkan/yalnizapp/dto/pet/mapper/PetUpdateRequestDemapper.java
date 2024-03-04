package com.gokdenizozkan.yalnizapp.dto.pet.mapper;

import com.gokdenizozkan.yalnizapp.config.exception.ResourceNotFoundException;
import com.gokdenizozkan.yalnizapp.dto.pet.request.PetUpdateRequest;
import com.gokdenizozkan.yalnizapp.entity.Pet;
import com.gokdenizozkan.yalnizapp.layer.repository.OwnerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.function.Function;

@Component
@RequiredArgsConstructor
public class PetUpdateRequestDemapper implements Function<PetUpdateRequest, Pet> {
    private final OwnerRepository ownerRepository;

    @Override
    public Pet apply(PetUpdateRequest request) {
        Pet pet = new Pet();

        pet.setId(request.id());
        pet.setName(request.name());
        pet.setSpecies(request.species());
        pet.setBreed(request.breed());
        pet.setGender(request.gender());
        pet.setColor(request.color());
        pet.setBirthdate(request.birthdate());
        pet.setOwner(ownerRepository.findById(request.ownerId())
                .orElseThrow(() -> new ResourceNotFoundException("Owner not found with id " + request.ownerId())));

        return pet;
    }
}
