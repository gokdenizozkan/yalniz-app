package com.gokdenizozkan.yalnizapp.layer.service;

import com.gokdenizozkan.yalnizapp.config.datastructure.Pair;
import com.gokdenizozkan.yalnizapp.config.exception.ResourceNotFoundException;
import com.gokdenizozkan.yalnizapp.config.response.Data;
import com.gokdenizozkan.yalnizapp.dto.owner.OwnerEntityMappers;
import com.gokdenizozkan.yalnizapp.dto.owner.request.OwnerSaveRequest;
import com.gokdenizozkan.yalnizapp.dto.owner.request.OwnerUpdateRequest;
import com.gokdenizozkan.yalnizapp.entity.Owner;
import com.gokdenizozkan.yalnizapp.entity.Pet;
import com.gokdenizozkan.yalnizapp.layer.repository.OwnerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OwnerService {
    private final OwnerRepository repository;
    private final OwnerEntityMappers entityMappers;

    public List<Owner> findAll() {
        return repository.findAll();
    }


    public Owner findById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Owner not found with id " + id));
    }

    public List<Owner> search(String name) {
        return repository.search(name);
    }

    public List<Pet> findPetsById(Long id) {
        Owner owner = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Owner not found with id " + id));
        return owner.getPets();
    }

    public Owner save(OwnerSaveRequest request) {
        Owner owner = entityMappers.fromSaveRequest.apply(request);
        return repository.save(owner);
    }

    public Data update(Long id, OwnerUpdateRequest request) {
        Owner foundOwner = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Owner not found with id " + id));

        Owner savedOwner = entityMappers.fromUpdateRequest.apply(request);
        savedOwner.setId(foundOwner.getId());
        repository.save(savedOwner);

        return Data.of(Pair.of("old", foundOwner), Pair.of("new", savedOwner));
    }

    public void deleteById(Long id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Owner not found with id " + id);
        }
        repository.deleteById(id);
    }
}
