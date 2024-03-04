package com.gokdenizozkan.yalnizapp.dto.workday.request;

import java.time.LocalDate;

public record WorkdayUpdateRequest(
        Long id,
        LocalDate date,
        Long vetId
) {}
