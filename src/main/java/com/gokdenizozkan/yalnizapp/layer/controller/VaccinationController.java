package com.gokdenizozkan.yalnizapp.layer.controller;

import com.gokdenizozkan.yalnizapp.config.response.StructuredResponse;
import com.gokdenizozkan.yalnizapp.dto.vaccination.request.VaccinationSaveRequest;
import com.gokdenizozkan.yalnizapp.dto.vaccination.request.VaccinationUpdateRequest;
import com.gokdenizozkan.yalnizapp.layer.responser.VaccinationResponser;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/v2/vaccinations")
@RequiredArgsConstructor
@CrossOrigin
public class VaccinationController {
    private final VaccinationResponser responser;

    @GetMapping
    public ResponseEntity<StructuredResponse> findAll() {
        return responser.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<StructuredResponse> findById(@PathVariable Long id) {
        return responser.findById(id);
    }

    @GetMapping("/of-pet/{petId}")
    public ResponseEntity<StructuredResponse> findAllByPetId(@PathVariable Long petId) {
        return responser.findAllByPetId(petId);
    }

    @GetMapping("/ending-soon")
    public ResponseEntity<StructuredResponse> findAllEndingSoon(@RequestParam LocalDate startDate, @RequestParam LocalDate endDate) {
        return responser.findAllEndingSoon(startDate, endDate);
    }

    @PostMapping
    public ResponseEntity<StructuredResponse> save(@RequestBody VaccinationSaveRequest request) {
        return responser.save(request);
    }

    @PutMapping("/{id}")
    public ResponseEntity<StructuredResponse> update(@PathVariable Long id, @RequestBody VaccinationUpdateRequest request) {
        return responser.update(id, request);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<StructuredResponse> deleteById(@PathVariable Long id) {
        return responser.deleteById(id);
    }
}
