package com.gokdenizozkan.yalnizapp.layer.controller;

import com.gokdenizozkan.yalnizapp.config.response.StructuredResponse;
import com.gokdenizozkan.yalnizapp.dto.appointment.request.AppointmentSaveRequest;
import com.gokdenizozkan.yalnizapp.dto.appointment.request.AppointmentUpdateRequest;
import com.gokdenizozkan.yalnizapp.layer.responser.AppointmentResponser;
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

@RestController
@RequestMapping("/api/v2/appointments")
@RequiredArgsConstructor
@CrossOrigin
public class AppointmentController {
    private final AppointmentResponser responser;

    @GetMapping
    public ResponseEntity<StructuredResponse> findAll() {
        return responser.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<StructuredResponse> findById(@PathVariable Long id) {
        return responser.findById(id);
    }

    @GetMapping("/of-vet/{vetId}")
    public ResponseEntity<StructuredResponse> findAllByVetIdAndStartDateTimeBetween(@PathVariable Long vetId, @RequestParam String startDate, @RequestParam String endDate) {
        return responser.findAllByVetIdAndStartBetween(vetId, startDate, endDate);
    }

    @GetMapping("/of-pet/{petId}")
    public ResponseEntity<StructuredResponse> findAllByPetIdAndStartDateTimeBetween(@PathVariable Long petId, @RequestParam String startDate, @RequestParam String endDate) {
        return responser.findAllByPetIdAndStartBetween(petId, startDate, endDate);
    }

    @PutMapping("/{id}")
    public ResponseEntity<StructuredResponse> update(@PathVariable Long id, @RequestBody AppointmentUpdateRequest request) {
        return responser.update(id, request);
    }

    @PostMapping
    public ResponseEntity<StructuredResponse> save(@RequestBody AppointmentSaveRequest request) {
        return responser.save(request);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<StructuredResponse> deleteById(@PathVariable Long id) {
        return responser.deleteById(id);
    }

}
