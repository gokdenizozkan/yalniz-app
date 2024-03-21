package com.gokdenizozkan.yalnizapp.dto.vaccination.mapper;

import com.gokdenizozkan.yalnizapp.config.exception.ResourceNotFoundException;
import com.gokdenizozkan.yalnizapp.dto.vaccination.request.VaccinationUpdateRequest;
import com.gokdenizozkan.yalnizapp.entity.Vaccination;
import com.gokdenizozkan.yalnizapp.layer.repository.PetRepository;
import com.gokdenizozkan.yalnizapp.layer.repository.ReportRepository;
import com.gokdenizozkan.yalnizapp.layer.repository.VaccinationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.function.Function;

@Component
@RequiredArgsConstructor
public class VaccinationUpdateRequestDemapper implements Function<VaccinationUpdateRequest, Vaccination>{
    private final VaccinationRepository repository;
    private final PetRepository petRepository;
    private final ReportRepository reportRepository;

    @Override
    public Vaccination apply(VaccinationUpdateRequest vaccinationSaveRequest) {
        Vaccination vaccination = repository.findById(vaccinationSaveRequest.id())
                .orElseThrow(() -> new ResourceNotFoundException("Vaccination not found with id " + vaccinationSaveRequest.id()));

        vaccination.setId(vaccinationSaveRequest.id());
        vaccination.setName(vaccinationSaveRequest.name());
        vaccination.setCode(vaccinationSaveRequest.code());
        vaccination.setAdministrationDate(vaccinationSaveRequest.administrationDate());
        vaccination.setExpirationDate(vaccinationSaveRequest.expirationDate());
        vaccination.setPet(petRepository.findById(vaccinationSaveRequest.petId())
                .orElseThrow(() -> new ResourceNotFoundException("Pet not found with id " + vaccinationSaveRequest.petId())));
        vaccination.setReport(reportRepository.findById(vaccinationSaveRequest.reportId())
                .orElseThrow(() -> new ResourceNotFoundException("Report not found with id " + vaccinationSaveRequest.reportId())));


        return vaccination;
    }
}
