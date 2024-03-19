package com.gokdenizozkan.yalnizapp.layer.service;

import com.gokdenizozkan.yalnizapp.config.datastructure.Pair;
import com.gokdenizozkan.yalnizapp.config.exception.ResourceNotFoundException;
import com.gokdenizozkan.yalnizapp.config.response.Data;
import com.gokdenizozkan.yalnizapp.dto.workday.WorkdayEntityMappers;
import com.gokdenizozkan.yalnizapp.dto.workday.request.WorkdaySaveRequest;
import com.gokdenizozkan.yalnizapp.dto.workday.request.WorkdayUpdateRequest;
import com.gokdenizozkan.yalnizapp.entity.Workday;
import com.gokdenizozkan.yalnizapp.layer.repository.WorkdayRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class WorkdayService {
    private final WorkdayRepository repository;
    private final WorkdayEntityMappers entityMappers;

    public List<Workday> findAll() {
        return repository.findAll();
    }

    public Workday findById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Workday not found with id: " + id));
    }

    public Workday save(WorkdaySaveRequest request) {
        Workday workday = entityMappers.fromSaveRequest.apply(request);
        return repository.save(workday);
    }

    public Data update(Long id, WorkdayUpdateRequest request) {
        Workday foundWorkday = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Workday not found with id: " + id));

        Workday updatedWorkday = entityMappers.fromUpdateRequest.apply(request);
        repository.save(updatedWorkday);

        return Data.of(Pair.of("old", foundWorkday), Pair.of("new", updatedWorkday));
    }

    public void deleteById(Long id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Workday not found with id: " + id);
        }
        repository.deleteById(id);
    }
}