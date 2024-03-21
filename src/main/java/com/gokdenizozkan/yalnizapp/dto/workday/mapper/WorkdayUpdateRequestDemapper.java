package com.gokdenizozkan.yalnizapp.dto.workday.mapper;

import com.gokdenizozkan.yalnizapp.config.exception.ResourceNotFoundException;
import com.gokdenizozkan.yalnizapp.dto.workday.request.WorkdaySaveRequest;
import com.gokdenizozkan.yalnizapp.dto.workday.request.WorkdayUpdateRequest;
import com.gokdenizozkan.yalnizapp.entity.Workday;
import com.gokdenizozkan.yalnizapp.layer.repository.VetRepository;
import com.gokdenizozkan.yalnizapp.layer.repository.WorkdayRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.function.Function;

@Component
@RequiredArgsConstructor
public class WorkdayUpdateRequestDemapper implements Function<WorkdayUpdateRequest, Workday> {
    private final WorkdayRepository repository;
    private final VetRepository vetRepository;

    @Override
    public Workday apply(WorkdayUpdateRequest workdayUpdateRequest) {
        Workday workday = repository.findById(workdayUpdateRequest.id())
                .orElseThrow(() -> new ResourceNotFoundException("Workday not found with id " + workdayUpdateRequest.id()));

        workday.setId(workdayUpdateRequest.id());
        workday.setDate(workdayUpdateRequest.date());
        workday.setVet(vetRepository.findById(workdayUpdateRequest.vetId())
                .orElseThrow(() -> new ResourceNotFoundException("Vet not found with id: " + workdayUpdateRequest.vetId())));

        return workday;
    }
}
