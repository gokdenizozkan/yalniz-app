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
import java.util.Optional;

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

    public Vaccination saveForPet(Long petId, VaccinationSaveRequest request) {
        if (repository.existsVaccinationCurrentlyIntact(petId, request.code(), request.administrationDate())) {
            throw new IllegalArgumentException("Vaccination already intact!");
        }

        Vaccination vaccination = entityMappers.fromSaveRequest.apply(request);
        return repository.save(vaccination);
    }

    public Data update(Long id, VaccinationUpdateRequest request) {
        Vaccination foundVaccination = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Vaccination not found with id " + id));

        Vaccination savedVaccination = entityMappers.fromUpdateRequest.apply(request);
        repository.save(savedVaccination);
        return Data.of(Pair.of("old", foundVaccination), Pair.of("new", savedVaccination));
    }

    public void deleteById(Long id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Vaccination not found with id " + id);
        }
        repository.deleteById(id);
    }
}
