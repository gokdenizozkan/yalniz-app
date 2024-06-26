package com.gokdenizozkan.yalnizapp.layer.controller;

import com.gokdenizozkan.yalnizapp.config.response.StructuredResponse;
import com.gokdenizozkan.yalnizapp.dto.vet.request.VetSaveRequest;
import com.gokdenizozkan.yalnizapp.dto.vet.request.VetUpdateRequest;
import com.gokdenizozkan.yalnizapp.layer.responser.VetResponser;
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
@RequestMapping("/api/v2/vets")
@RequiredArgsConstructor
@CrossOrigin
public class VetController {
    private final VetResponser responser;

    @GetMapping
    public ResponseEntity<StructuredResponse> findAll() {
        return responser.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<StructuredResponse> findById(@PathVariable Long id) {
        return responser.findById(id);
    }

    @GetMapping("/{id}/with-workdays")
    public ResponseEntity<StructuredResponse> findByIdWithWorkdays(@PathVariable Long id) {
        return responser.findByIdWithWorkdays(id);
    }

    @PostMapping
    public ResponseEntity<StructuredResponse> save(@RequestBody VetSaveRequest request) {
        return responser.save(request);
    }

    @PutMapping("/{id}")
    public ResponseEntity<StructuredResponse> update(@PathVariable Long id, @RequestBody VetUpdateRequest request) {
        return responser.update(id, request);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<StructuredResponse> deleteById(@PathVariable Long id) {
        return responser.deleteById(id);
    }
}
