package com.gokdenizozkan.yalnizapp.dto.report.request;

public record ReportSaveRequest(
        String title,
        String diagnosis,
        Double cost,
        Long appointmentId
) {
}
