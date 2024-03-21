package com.gokdenizozkan.yalnizapp.layer.responser;

import com.gokdenizozkan.yalnizapp.config.response.Data;
import com.gokdenizozkan.yalnizapp.config.response.StructuredResponse;
import com.gokdenizozkan.yalnizapp.config.response.StructuredResponseEntityBuilder;
import com.gokdenizozkan.yalnizapp.dto.vet.VetDtoMappers;
import com.gokdenizozkan.yalnizapp.dto.vet.request.VetSaveRequest;
import com.gokdenizozkan.yalnizapp.dto.vet.request.VetUpdateRequest;
import com.gokdenizozkan.yalnizapp.dto.vet.response.VetResponse;
import com.gokdenizozkan.yalnizapp.dto.vet.response.VetResponseWithWorkdays;
import com.gokdenizozkan.yalnizapp.entity.Vet;
import com.gokdenizozkan.yalnizapp.layer.service.VetService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class VetResponser {
    private final VetService service;
    private final VetDtoMappers dtoMappers;

    public ResponseEntity<StructuredResponse> findAll() {
        List<Vet> vets = service.findAll();
        List<VetResponse> responses = vets.stream().map(dtoMappers.toResponse).toList();
        return StructuredResponseEntityBuilder.success(responses);
    }

    public ResponseEntity<StructuredResponse> findById(Long id) {
        Vet vet = service.findById(id);
        VetResponse response = dtoMappers.toResponse.apply(vet);
        return StructuredResponseEntityBuilder.success(response);
    }

    public ResponseEntity<StructuredResponse> save(VetSaveRequest request) {
        Vet savedVet = service.save(request);
        VetResponse response = dtoMappers.toResponse.apply(savedVet);
        return StructuredResponseEntityBuilder.success(response);
    }

    public ResponseEntity<StructuredResponse> update(Long id, VetUpdateRequest request) {
        Vet vet = service.update(id, request);
        VetResponse response = dtoMappers.toResponse.apply(vet);
        return StructuredResponseEntityBuilder.success(response);
    }

    public ResponseEntity<StructuredResponse> deleteById(Long id) {
        service.deleteById(id);
        return StructuredResponseEntityBuilder.success();
    }

    public ResponseEntity<StructuredResponse> findByIdWithWorkdays(Long id) {
        Vet vet = service.findById(id);
        VetResponseWithWorkdays response = dtoMappers.toResponseWithWorkdays.apply(vet);
        return StructuredResponseEntityBuilder.success(response);
    }
}
