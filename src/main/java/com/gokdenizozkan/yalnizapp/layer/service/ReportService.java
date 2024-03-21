package com.gokdenizozkan.yalnizapp.layer.service;

import com.gokdenizozkan.yalnizapp.config.datastructure.Pair;
import com.gokdenizozkan.yalnizapp.config.exception.ResourceNotFoundException;
import com.gokdenizozkan.yalnizapp.config.response.Data;
import com.gokdenizozkan.yalnizapp.dto.report.ReportEntityMappers;
import com.gokdenizozkan.yalnizapp.dto.report.request.ReportSaveRequest;
import com.gokdenizozkan.yalnizapp.dto.report.request.ReportUpdateRequest;
import com.gokdenizozkan.yalnizapp.dto.report.request.ReportVaccinationAddRequest;
import com.gokdenizozkan.yalnizapp.entity.Report;
import com.gokdenizozkan.yalnizapp.entity.Vaccination;
import com.gokdenizozkan.yalnizapp.layer.repository.AppointmentRepository;
import com.gokdenizozkan.yalnizapp.layer.repository.ReportRepository;
import com.gokdenizozkan.yalnizapp.layer.repository.VaccinationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReportService {
    private final ReportRepository repository;
    private final ReportEntityMappers entityMappers;

    private final VaccinationRepository vaccinationRepository;
    private final AppointmentRepository appointmentRepository;

    public List<Report> findAll() {
        return repository.findAll();
    }

    public Report findById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Report not found with id: " + id));
    }

    public Report save(ReportSaveRequest request) {
        Report report = entityMappers.fromSaveRequest.apply(request);
        return repository.save(report);
    }

    public Report update(Long id, ReportUpdateRequest request) {
        Report updatedReport = entityMappers.fromUpdateRequest.apply(request);
        return repository.save(updatedReport);
    }

    public void deleteById(Long id) {
        Report report = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Report not found with id: " + id));

        report.getAppointment().setReport(null);
//        report.setAppointment(null);
        appointmentRepository.save(report.getAppointment());
//        repository.save(report);
        repository.flush();
        repository.deleteById(id);
    }
}
