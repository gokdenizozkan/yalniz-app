package com.gokdenizozkan.yalnizapp.dto.owner.mapper;

import com.gokdenizozkan.yalnizapp.dto.owner.request.OwnerSaveRequest;
import com.gokdenizozkan.yalnizapp.entity.Owner;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.function.Function;

@Component
public class OwnerSaveRequestDemapper implements Function<OwnerSaveRequest, Owner>{
    @Override
    public Owner apply(OwnerSaveRequest ownerSaveRequest) {
        Owner owner = new Owner();

        owner.setName(ownerSaveRequest.name());
        owner.setPhone(ownerSaveRequest.phone());
        owner.setEmail(ownerSaveRequest.email());
        owner.setAddress(ownerSaveRequest.address());
        owner.setCity(ownerSaveRequest.city());
        owner.setPets(new ArrayList<>());

        return owner;
    }
}
