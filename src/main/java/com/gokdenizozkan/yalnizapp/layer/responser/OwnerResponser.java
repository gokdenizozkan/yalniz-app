package com.gokdenizozkan.yalnizapp.layer.responser;

import com.gokdenizozkan.yalnizapp.config.response.Data;
import com.gokdenizozkan.yalnizapp.config.response.StructuredResponse;
import com.gokdenizozkan.yalnizapp.config.response.StructuredResponseEntityBuilder;
import com.gokdenizozkan.yalnizapp.dto.owner.OwnerDtoMappers;
import com.gokdenizozkan.yalnizapp.dto.owner.request.OwnerSaveRequest;
import com.gokdenizozkan.yalnizapp.dto.owner.request.OwnerUpdateRequest;
import com.gokdenizozkan.yalnizapp.dto.owner.response.OwnerResponse;
import com.gokdenizozkan.yalnizapp.dto.pet.PetDtoMappers;
import com.gokdenizozkan.yalnizapp.dto.pet.response.PetResponse;
import com.gokdenizozkan.yalnizapp.entity.Owner;
import com.gokdenizozkan.yalnizapp.entity.Pet;
import com.gokdenizozkan.yalnizapp.layer.service.OwnerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class OwnerResponser {
    private final OwnerService service;
    private final OwnerDtoMappers dtoMappers;
    private final PetDtoMappers petDtoMappers;

    public ResponseEntity<StructuredResponse> findAll() {
        List<Owner> owners = service.findAll();
        List<OwnerResponse> responses = owners.stream().map(dtoMappers.toResponse).toList();
        return StructuredResponseEntityBuilder.success(responses);
    }

    public ResponseEntity<StructuredResponse> findById(Long id) {
        Owner owner = service.findById(id);
        OwnerResponse response = dtoMappers.toResponse.apply(owner);
        return StructuredResponseEntityBuilder.success(response);
    }


    public ResponseEntity<StructuredResponse> search(String name) {
        List<Owner> owners = service.search(name);
        List<OwnerResponse> responses = owners.stream().map(dtoMappers.toResponse).toList();
        return StructuredResponseEntityBuilder.success(responses);
    }

    public ResponseEntity<StructuredResponse> findPetsById(Long id) {
        List<Pet> owners = service.findPetsById(id);
        List<PetResponse> responses = owners.stream().map(petDtoMappers.toResponse).toList();
        return StructuredResponseEntityBuilder.success(responses);
    }

    public ResponseEntity<StructuredResponse> save(OwnerSaveRequest request) {
        Owner owner = service.save(request);
        OwnerResponse response = dtoMappers.toResponse.apply(owner);
        return StructuredResponseEntityBuilder.success(response);
    }


    public ResponseEntity<StructuredResponse> update(Long id, OwnerUpdateRequest request) {
        Data data = service.update(id, request);
        data.map(dtoMappers.toResponse);

        return StructuredResponseEntityBuilder.success(data.get());
    }

    public ResponseEntity<StructuredResponse> deleteById(Long id) {
        service.deleteById(id);
        return StructuredResponseEntityBuilder.success();
    }
}
