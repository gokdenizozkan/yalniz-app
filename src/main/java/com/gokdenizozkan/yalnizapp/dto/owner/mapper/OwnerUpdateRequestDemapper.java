package com.gokdenizozkan.yalnizapp.dto.owner.mapper;

import com.gokdenizozkan.yalnizapp.dto.owner.request.OwnerUpdateRequest;
import com.gokdenizozkan.yalnizapp.entity.Owner;
import com.gokdenizozkan.yalnizapp.layer.repository.OwnerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.function.Function;

@Component
@RequiredArgsConstructor
public class OwnerUpdateRequestDemapper implements Function<OwnerUpdateRequest, Owner> {
    private final OwnerRepository repository;
    @Override
    public Owner apply(OwnerUpdateRequest ownerUpdateRequest) {
        Owner owner = repository.findById(ownerUpdateRequest.id())
                .orElseThrow(() -> new IllegalArgumentException("Owner not found with id " + ownerUpdateRequest.id()));

        owner.setId(ownerUpdateRequest.id());
        owner.setName(ownerUpdateRequest.name());
        owner.setPhone(ownerUpdateRequest.phone());
        owner.setEmail(ownerUpdateRequest.email());
        owner.setAddress(ownerUpdateRequest.address());
        owner.setCity(ownerUpdateRequest.city());

        return owner;
    }
}
