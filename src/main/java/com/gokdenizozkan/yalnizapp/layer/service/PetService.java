package com.gokdenizozkan.yalnizapp.layer.service;

import com.gokdenizozkan.yalnizapp.config.datastructure.Pair;
import com.gokdenizozkan.yalnizapp.config.exception.ResourceNotFoundException;
import com.gokdenizozkan.yalnizapp.config.response.Data;
import com.gokdenizozkan.yalnizapp.dto.pet.PetEntityMappers;
import com.gokdenizozkan.yalnizapp.dto.pet.request.PetSaveRequest;
import com.gokdenizozkan.yalnizapp.dto.pet.request.PetUpdateRequest;
import com.gokdenizozkan.yalnizapp.entity.Pet;
import com.gokdenizozkan.yalnizapp.layer.repository.PetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PetService {
    private final PetRepository repository;
    private final PetEntityMappers entityMappers;

    public List<Pet> findAll() {
        return repository.findAll();
    }

    public Pet findById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Pet not found with id " + id));
    }

    public List<Pet> search(String name) {
        return repository.findAllByNameContaining(name);
    }

    public Pet save(PetSaveRequest request) {
        Pet pet = entityMappers.fromSaveRequest.apply(request);
        return repository.save(pet);
    }

    public Data update(Long id, PetUpdateRequest request) {
        Pet foundPet = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Pet not found with id " + id));

        Pet pet = entityMappers.fromUpdateRequest.apply(request);
        Pet updatedPet = repository.save(pet);

        return Data.of(Pair.of("old", foundPet), Pair.of("new", updatedPet));
    }

    public void deleteById(Long id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Pet not found with id " + id);
        }
        repository.deleteById(id);
    }
}
