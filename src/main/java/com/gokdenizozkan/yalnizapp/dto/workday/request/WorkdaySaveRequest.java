package com.gokdenizozkan.yalnizapp.dto.workday.request;

import java.time.LocalDate;

public record WorkdaySaveRequest(
        LocalDate date,
        Long vetId
) {}
