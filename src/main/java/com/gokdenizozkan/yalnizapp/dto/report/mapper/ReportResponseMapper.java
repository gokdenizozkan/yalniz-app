package com.gokdenizozkan.yalnizapp.dto.report.mapper;

import com.gokdenizozkan.yalnizapp.dto.report.response.ReportResponse;
import com.gokdenizozkan.yalnizapp.dto.vaccination.VaccinationDtoMappers;
import com.gokdenizozkan.yalnizapp.entity.Report;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.function.Function;

@Component
@RequiredArgsConstructor
public class ReportResponseMapper implements Function<Report, ReportResponse> {
    private final VaccinationDtoMappers vaccinationDtoMappers;

    @Override
    public ReportResponse apply(Report report) {
        return new ReportResponse(
                report.getId(),
                report.getTitle(),
                report.getDiagnosis(),
                report.getCost(),
                report.getAppointment().getId(),
                report.getAppointment().getStart(),
                report.getVaccinations().stream().map(vaccinationDtoMappers.toResponse).toList()
        );
    }
}
