package com.gokdenizozkan.yalnizapp.layer.service;

import com.gokdenizozkan.yalnizapp.config.datastructure.Pair;
import com.gokdenizozkan.yalnizapp.config.exception.ResourceNotFoundException;
import com.gokdenizozkan.yalnizapp.config.response.Data;
import com.gokdenizozkan.yalnizapp.dto.vet.VetEntityMappers;
import com.gokdenizozkan.yalnizapp.dto.vet.request.VetSaveRequest;
import com.gokdenizozkan.yalnizapp.dto.vet.request.VetUpdateRequest;
import com.gokdenizozkan.yalnizapp.entity.Vet;
import com.gokdenizozkan.yalnizapp.layer.repository.VetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class VetService {
    private final VetRepository repository;
    private final VetEntityMappers entityMappers;

    public List<Vet> findAll() {
        return repository.findAll();
    }

    public Vet findById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Vet not found with id " + id));
    }

    public Vet save(VetSaveRequest request) {
        Vet vet = entityMappers.fromSaveRequest.apply(request);
        return repository.save(vet);
    }

    public Data update(Long id, VetUpdateRequest request) {
        Vet foundVet = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Vet not found with id " + id));

        Vet updatedVet = entityMappers.fromUpdateRequest.apply(request);
        repository.save(updatedVet);

        return Data.of(Pair.of("old", foundVet), Pair.of("new", updatedVet));
    }

    public void deleteById(Long id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Vet not found with id " + id);
        }
        repository.deleteById(id);
    }
}
