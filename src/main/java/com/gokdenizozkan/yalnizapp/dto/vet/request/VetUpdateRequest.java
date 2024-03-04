package com.gokdenizozkan.yalnizapp.dto.vet.request;

public record VetUpdateRequest(
        Long id,
        String name,
        String phone,
        String email,
        String address,
        String city
) {
}
