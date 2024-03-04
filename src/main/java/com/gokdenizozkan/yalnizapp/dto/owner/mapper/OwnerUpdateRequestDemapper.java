package com.gokdenizozkan.yalnizapp.dto.owner.mapper;

import com.gokdenizozkan.yalnizapp.dto.owner.request.OwnerUpdateRequest;
import com.gokdenizozkan.yalnizapp.entity.Owner;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.function.Function;

@Component
@RequiredArgsConstructor
public class OwnerUpdateRequestDemapper implements Function<OwnerUpdateRequest, Owner> {
    @Override
    public Owner apply(OwnerUpdateRequest ownerUpdateRequest) {
        Owner owner = new Owner();

        owner.setId(ownerUpdateRequest.id());
        owner.setName(ownerUpdateRequest.name());
        owner.setPhone(ownerUpdateRequest.phone());
        owner.setEmail(ownerUpdateRequest.email());
        owner.setAddress(ownerUpdateRequest.address());
        owner.setCity(ownerUpdateRequest.city());

        return owner;
    }
}
