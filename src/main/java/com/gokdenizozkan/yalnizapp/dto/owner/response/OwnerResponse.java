package com.gokdenizozkan.yalnizapp.dto.owner.response;

import com.gokdenizozkan.yalnizapp.dto.pet.response.PetResponse;
import com.gokdenizozkan.yalnizapp.entity.Pet;

import java.util.List;

public record OwnerResponse(
        Long id,
        String name,
        String phone,
        String email,
        String address,
        String city,
        List<PetResponse> pets
) {
}
