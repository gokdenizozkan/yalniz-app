package com.gokdenizozkan.yalnizapp.dto.report.response;

import com.gokdenizozkan.yalnizapp.dto.vaccination.response.VaccinationResponse;
import com.gokdenizozkan.yalnizapp.entity.Vaccination;

import java.time.LocalDateTime;
import java.util.List;

public record ReportResponse(
        Long id,
        String title,
        String diagnosis,
        Double cost,
        Long appointmentId,
        LocalDateTime appointmentDateTime,
        List<VaccinationResponse> vaccinations
) {
}
