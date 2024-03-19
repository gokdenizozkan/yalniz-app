package com.gokdenizozkan.yalnizapp.layer.controller;

import com.gokdenizozkan.yalnizapp.config.response.StructuredResponse;
import com.gokdenizozkan.yalnizapp.dto.report.request.ReportSaveRequest;
import com.gokdenizozkan.yalnizapp.dto.report.request.ReportUpdateRequest;
import com.gokdenizozkan.yalnizapp.dto.report.request.ReportVaccinationAddRequest;
import com.gokdenizozkan.yalnizapp.layer.responser.ReportResponser;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v2/reports")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class ReportController {
    private final ReportResponser responser;

    @GetMapping
    public ResponseEntity<StructuredResponse> findAll() {
        return responser.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<StructuredResponse> findById(@PathVariable Long id) {
        return responser.findById(id);
    }

    @PostMapping
    public ResponseEntity<StructuredResponse> save(@RequestBody ReportSaveRequest request) {
        return responser.save(request);
    }

    @PutMapping("/{id}")
    public ResponseEntity<StructuredResponse> update(@PathVariable Long id, @RequestBody ReportUpdateRequest request) {
        return responser.update(id, request);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<StructuredResponse> saveVaccination(@PathVariable Long id, @RequestBody ReportVaccinationAddRequest request) {
        return responser.saveVaccination(id, request);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<StructuredResponse> delete(@PathVariable Long id) {
        return responser.deleteById(id);
    }
}
