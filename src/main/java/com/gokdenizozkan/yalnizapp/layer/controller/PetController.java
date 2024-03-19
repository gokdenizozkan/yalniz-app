package com.gokdenizozkan.yalnizapp.layer.controller;

import com.gokdenizozkan.yalnizapp.config.response.StructuredResponse;
import com.gokdenizozkan.yalnizapp.dto.pet.request.PetSaveRequest;
import com.gokdenizozkan.yalnizapp.dto.pet.request.PetUpdateRequest;
import com.gokdenizozkan.yalnizapp.layer.responser.PetResponser;
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
@RequestMapping("/api/v2/pets")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class PetController {
    private final PetResponser responser;

    @GetMapping
    public ResponseEntity<StructuredResponse> findAll() {
        return responser.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<StructuredResponse> findById(@PathVariable Long id) {
        return responser.findById(id);
    }

    @GetMapping("/search")
    public ResponseEntity<StructuredResponse> search(@RequestParam String name) {
        return responser.search(name);
    }

    @PostMapping
    public ResponseEntity<StructuredResponse> save(@RequestBody PetSaveRequest request) {
        return responser.save(request);
    }

    @PutMapping("/{id}")
    public ResponseEntity<StructuredResponse> update(@PathVariable Long id, @RequestBody PetUpdateRequest request) {
        return responser.update(id, request);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<StructuredResponse> deleteById(@PathVariable Long id) {
        return responser.deleteById(id);
    }
}
