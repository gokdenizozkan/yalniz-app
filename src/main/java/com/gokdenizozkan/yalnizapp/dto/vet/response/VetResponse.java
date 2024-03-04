package com.gokdenizozkan.yalnizapp.dto.vet.response;

public record VetResponse(
        Long id,
        String name,
        String phone,
        String email,
        String address,
        String city
) {
}
