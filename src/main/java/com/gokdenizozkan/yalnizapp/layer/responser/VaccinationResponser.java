package com.gokdenizozkan.yalnizapp.layer.responser;

import com.gokdenizozkan.yalnizapp.config.response.Data;
import com.gokdenizozkan.yalnizapp.config.response.StructuredResponse;
import com.gokdenizozkan.yalnizapp.config.response.StructuredResponseEntityBuilder;
import com.gokdenizozkan.yalnizapp.dto.vaccination.VaccinationDtoMappers;
import com.gokdenizozkan.yalnizapp.dto.vaccination.response.VaccinationResponse;
import com.gokdenizozkan.yalnizapp.dto.vaccination.request.VaccinationSaveRequest;
import com.gokdenizozkan.yalnizapp.dto.vaccination.request.VaccinationUpdateRequest;
import com.gokdenizozkan.yalnizapp.entity.Vaccination;
import com.gokdenizozkan.yalnizapp.layer.service.VaccinationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.util.List;
import java.time.LocalDate;

@Component
@RequiredArgsConstructor
public class VaccinationResponser {
    private final VaccinationService service;
    private final VaccinationDtoMappers dtoMappers;

    public ResponseEntity<StructuredResponse> findAll() {
        List<Vaccination> vaccinations = service.findAll();
        List<VaccinationResponse> responses = vaccinations.stream().map(dtoMappers.toResponse).toList();
        return StructuredResponseEntityBuilder.success(responses);
    }

    public ResponseEntity<StructuredResponse> findById(Long id) {
        Vaccination vaccination = service.findById(id);
        VaccinationResponse response = dtoMappers.toResponse.apply(vaccination);
        return StructuredResponseEntityBuilder.success(response);
    }

    public ResponseEntity<StructuredResponse> findAllByPetId(Long petId) {
        List<Vaccination> vaccinations = service.findAllByPetId(petId);
        List<VaccinationResponse> responses = vaccinations.stream().map(dtoMappers.toResponse).toList();
        return StructuredResponseEntityBuilder.success(responses);
    }

    public ResponseEntity<StructuredResponse> findAllEndingSoon(LocalDate startDate, LocalDate endDate) {
        List<Vaccination> vaccinations = service.findAllEndingSoon(startDate, endDate);
        List<VaccinationResponse> responses = vaccinations.stream().map(dtoMappers.toResponse).toList();
        return StructuredResponseEntityBuilder.success(responses);
    }

    public ResponseEntity<StructuredResponse> save(VaccinationSaveRequest request) {
        Vaccination vaccination = service.save(request);
        VaccinationResponse response = dtoMappers.toResponse.apply(vaccination);
        return StructuredResponseEntityBuilder.success(response);
    }

    public ResponseEntity<StructuredResponse> update(Long id, VaccinationUpdateRequest request) {
        Vaccination vaccination = service.update(id, request);
        VaccinationResponse response = dtoMappers.toResponse.apply(vaccination);
        return StructuredResponseEntityBuilder.success(response);
    }

    public ResponseEntity<StructuredResponse> deleteById(Long id) {
        service.deleteById(id);
        return StructuredResponseEntityBuilder.success();
    }
}
