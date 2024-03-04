package com.gokdenizozkan.yalnizapp.dto.report.mapper;

import com.gokdenizozkan.yalnizapp.config.exception.ResourceNotFoundException;
import com.gokdenizozkan.yalnizapp.dto.report.request.ReportSaveRequest;
import com.gokdenizozkan.yalnizapp.entity.Report;
import com.gokdenizozkan.yalnizapp.layer.repository.AppointmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.function.Function;

@Component
@RequiredArgsConstructor
public class ReportSaveRequestDemapper implements Function<ReportSaveRequest, Report> {
    private final AppointmentRepository appointmentRepository;

    @Override
    public Report apply(ReportSaveRequest reportSaveRequest) {
        Report report = new Report();

        report.setTitle(reportSaveRequest.title());
        report.setDiagnosis(reportSaveRequest.diagnosis());
        report.setCost(reportSaveRequest.cost());
        report.setAppointment(appointmentRepository.findById(reportSaveRequest.appointmentId())
                .orElseThrow(() -> new ResourceNotFoundException("Appointment not found with id: " + reportSaveRequest.appointmentId())));

        return report;
    }
}
