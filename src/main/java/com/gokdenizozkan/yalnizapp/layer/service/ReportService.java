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

    public Data saveVaccination(Long id, ReportVaccinationAddRequest request) {
        Report report = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Report not found with id: " + id));
        Pair oldData = Pair.of("old", report);

        Vaccination vaccinationToBeSaved = vaccinationRepository.findById(request.vaccinationId())
                .orElseThrow(() -> new ResourceNotFoundException("Vaccination not found with id: " + request.vaccinationId()));

        report.getVaccinations().add(vaccinationToBeSaved);
        Pair newData = Pair.of("new", report);

        // TODO check if vaccination already exists in report

        repository.save(report);
        return Data.of(oldData, newData);
    }

    public Report update(Long id, ReportUpdateRequest request) {
        Report updatedReport = entityMappers.fromUpdateRequest.apply(request);
        return repository.save(updatedReport);
    }

    public void deleteById(Long id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Report not found with id: " + id);
        }
        repository.deleteById(id);
    }
}
