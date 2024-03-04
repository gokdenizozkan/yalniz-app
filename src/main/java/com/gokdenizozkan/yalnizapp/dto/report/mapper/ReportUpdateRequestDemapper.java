package com.gokdenizozkan.yalnizapp.dto.report.mapper;

import com.gokdenizozkan.yalnizapp.config.exception.ResourceNotFoundException;
import com.gokdenizozkan.yalnizapp.dto.report.request.ReportUpdateRequest;
import com.gokdenizozkan.yalnizapp.entity.Report;
import com.gokdenizozkan.yalnizapp.layer.repository.AppointmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.function.Function;

@Component
@RequiredArgsConstructor
public class ReportUpdateRequestDemapper implements Function<ReportUpdateRequest, Report> {
    private final AppointmentRepository appointmentRepository;

    @Override
    public Report apply(ReportUpdateRequest reportUpdateRequest) {
        Report report = new Report();

        report.setId(reportUpdateRequest.id());
        report.setTitle(reportUpdateRequest.title());
        report.setDiagnosis(reportUpdateRequest.diagnosis());
        report.setCost(reportUpdateRequest.cost());
        report.setAppointment(appointmentRepository.findById(reportUpdateRequest.appointmentId())
                .orElseThrow(() -> new ResourceNotFoundException("Appointment not found with id: " + reportUpdateRequest.appointmentId())));

        return report;
    }
}
