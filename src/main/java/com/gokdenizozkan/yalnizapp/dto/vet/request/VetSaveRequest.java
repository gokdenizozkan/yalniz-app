package com.gokdenizozkan.yalnizapp.dto.vet.request;

public record VetSaveRequest(
    String name,
    String phone,
    String email,
    String address,
    String city
) {
}
