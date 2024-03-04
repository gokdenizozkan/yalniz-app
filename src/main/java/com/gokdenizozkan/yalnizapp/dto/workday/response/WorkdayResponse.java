package com.gokdenizozkan.yalnizapp.dto.workday.response;

import java.time.LocalDate;

public record WorkdayResponse(
        Long id,
        LocalDate date,
        Long vetId
) {
}
