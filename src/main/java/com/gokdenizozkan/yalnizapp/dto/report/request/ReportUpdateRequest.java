package com.gokdenizozkan.yalnizapp.dto.report.request;

public record ReportUpdateRequest(
        Long id,
        String title,
        String diagnosis,
        Double cost,
        Long appointmentId
) {
}
