package com.gokdenizozkan.yalnizapp.layer.service;

import com.gokdenizozkan.yalnizapp.config.datastructure.Pair;
import com.gokdenizozkan.yalnizapp.config.exception.ResourceNotFoundException;
import com.gokdenizozkan.yalnizapp.config.response.Data;
import com.gokdenizozkan.yalnizapp.dto.vaccination.VaccinationEntityMappers;
import com.gokdenizozkan.yalnizapp.dto.vaccination.request.VaccinationSaveRequest;
import com.gokdenizozkan.yalnizapp.dto.vaccination.request.VaccinationUpdateRequest;
import com.gokdenizozkan.yalnizapp.entity.Vaccination;
import com.gokdenizozkan.yalnizapp.layer.repository.VaccinationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class VaccinationService {
    private final VaccinationRepository repository;
    private final VaccinationEntityMappers entityMappers;


    public List<Vaccination> findAll() {
        return repository.findAll();
    }

    public Vaccination findById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Vaccination not found with id " + id));
    }

    public List<Vaccination> findAllByPetId(Long petId) {
        return repository.findAllByPetIdOrderByExpirationDateDesc(petId);
    }

    public List<Vaccination> findAllEndingSoon(LocalDate startDate, LocalDate endDate) {
        return repository.findAllByExpirationDateBetween(startDate, endDate);
    }

    public Vaccination save(VaccinationSaveRequest request) {
        if (repository.existsVaccinationCurrentlyIntact(request.petId(), request.code(), request.administrationDate())) {
            throw new IllegalArgumentException("Vaccination already intact!");
        }

        Vaccination vaccination = entityMappers.fromSaveRequest.apply(request);
        return repository.save(vaccination);
    }

    public Vaccination update(Long id, VaccinationUpdateRequest request) {
        Vaccination savedVaccination = entityMappers.fromUpdateRequest.apply(request);
        return repository.save(savedVaccination);
    }

    public void deleteById(Long id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Vaccination not found with id " + id);
        }
        repository.deleteById(id);
    }
}
