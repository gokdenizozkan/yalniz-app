package com.gokdenizozkan.yalnizapp.dto.vet.response;

import com.gokdenizozkan.yalnizapp.dto.workday.response.WorkdayResponse;

import java.util.List;

public record VetResponseWithWorkdays(
        Long id,
        String name,
        String phone,
        String email,
        String address,
        String city,
        List<WorkdayResponse> workdays
) {
}
