package com.gokdenizozkan.yalnizapp.layer.responser;

import com.gokdenizozkan.yalnizapp.config.response.Data;
import com.gokdenizozkan.yalnizapp.config.response.StructuredResponse;
import com.gokdenizozkan.yalnizapp.config.response.StructuredResponseEntityBuilder;
import com.gokdenizozkan.yalnizapp.dto.report.ReportDtoMappers;
import com.gokdenizozkan.yalnizapp.dto.report.request.ReportSaveRequest;
import com.gokdenizozkan.yalnizapp.dto.report.request.ReportUpdateRequest;
import com.gokdenizozkan.yalnizapp.dto.report.request.ReportVaccinationAddRequest;
import com.gokdenizozkan.yalnizapp.dto.report.response.ReportResponse;
import com.gokdenizozkan.yalnizapp.entity.Report;
import com.gokdenizozkan.yalnizapp.layer.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class ReportResponser {
    private final ReportService service;
    private final ReportDtoMappers dtoMappers;

    public ResponseEntity<StructuredResponse> findAll() {
        List<Report> reports = service.findAll();
        List<ReportResponse> responses = reports.stream().map(dtoMappers.toResponse).toList();
        return StructuredResponseEntityBuilder.success(responses);
    }

    public ResponseEntity<StructuredResponse> findById(Long id) {
        Report report = service.findById(id);
        ReportResponse response = dtoMappers.toResponse.apply(report);
        return StructuredResponseEntityBuilder.success(response);
    }

    public ResponseEntity<StructuredResponse> save(ReportSaveRequest request) {
        Report savedReport = service.save(request);
        ReportResponse response = dtoMappers.toResponse.apply(savedReport);
        return StructuredResponseEntityBuilder.success(response);
    }

    public ResponseEntity<StructuredResponse> update(Long id, ReportUpdateRequest request) {
        Report updatedReport = service.update(id, request);
        ReportResponse response = dtoMappers.toResponse.apply(updatedReport);
        return StructuredResponseEntityBuilder.success(response);
    }

    public ResponseEntity<StructuredResponse> saveVaccination(Long id, ReportVaccinationAddRequest request) {
        Data data = service.saveVaccination(id, request);
        data.map(dtoMappers.toResponse);
        return StructuredResponseEntityBuilder.success(data.get());
    }

    public ResponseEntity<StructuredResponse> deleteById(Long id) {
        service.deleteById(id);
        return StructuredResponseEntityBuilder.success();
    }
}
