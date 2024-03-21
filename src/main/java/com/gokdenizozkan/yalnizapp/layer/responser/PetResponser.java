package com.gokdenizozkan.yalnizapp.layer.responser;

import com.gokdenizozkan.yalnizapp.config.response.Data;
import com.gokdenizozkan.yalnizapp.config.response.StructuredResponse;
import com.gokdenizozkan.yalnizapp.config.response.StructuredResponseEntityBuilder;
import com.gokdenizozkan.yalnizapp.dto.pet.PetDtoMappers;
import com.gokdenizozkan.yalnizapp.dto.pet.request.PetSaveRequest;
import com.gokdenizozkan.yalnizapp.dto.pet.request.PetUpdateRequest;
import com.gokdenizozkan.yalnizapp.dto.pet.response.PetResponse;
import com.gokdenizozkan.yalnizapp.entity.Pet;
import com.gokdenizozkan.yalnizapp.layer.service.PetService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class PetResponser {
    private final PetService service;
    private final PetDtoMappers dtoMappers;

    public ResponseEntity<StructuredResponse> findAll() {
        List<Pet> pets = service.findAll();
        List<PetResponse> responses = pets.stream().map(dtoMappers.toResponse).toList();
        return StructuredResponseEntityBuilder.success(responses);
    }

    public ResponseEntity<StructuredResponse> findById(Long id) {
        Pet pet = service.findById(id);
        PetResponse response = dtoMappers.toResponse.apply(pet);
        return StructuredResponseEntityBuilder.success(response);
    }

    public ResponseEntity<StructuredResponse> search(String name) {
        List<Pet> pets = service.search(name);
        List<PetResponse> responses = pets.stream().map(dtoMappers.toResponse).toList();
        return StructuredResponseEntityBuilder.success(responses);
    }

    public ResponseEntity<StructuredResponse> save(PetSaveRequest request) {
        Pet pet = service.save(request);
        PetResponse response = dtoMappers.toResponse.apply(pet);
        return StructuredResponseEntityBuilder.success(response);
    }

    public ResponseEntity<StructuredResponse> update(Long id, PetUpdateRequest request) {
        Pet pet = service.update(id, request);
        PetResponse response = dtoMappers.toResponse.apply(pet);
        return StructuredResponseEntityBuilder.success(response);
    }

    public ResponseEntity<StructuredResponse> deleteById(Long id) {
        service.deleteById(id);
        return StructuredResponseEntityBuilder.success();
    }
}
