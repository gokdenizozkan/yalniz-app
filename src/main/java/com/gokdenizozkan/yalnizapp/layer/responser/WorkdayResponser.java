package com.gokdenizozkan.yalnizapp.layer.responser;

import com.gokdenizozkan.yalnizapp.config.response.Data;
import com.gokdenizozkan.yalnizapp.config.response.StructuredResponse;
import com.gokdenizozkan.yalnizapp.config.response.StructuredResponseEntityBuilder;
import com.gokdenizozkan.yalnizapp.dto.workday.WorkdayDtoMappers;
import com.gokdenizozkan.yalnizapp.dto.workday.request.WorkdaySaveRequest;
import com.gokdenizozkan.yalnizapp.dto.workday.response.WorkdayResponse;
import com.gokdenizozkan.yalnizapp.entity.Workday;
import com.gokdenizozkan.yalnizapp.layer.service.WorkdayService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class WorkdayResponser {
    private final WorkdayService service;
    private final WorkdayDtoMappers dtoMappers;

    public ResponseEntity<StructuredResponse> findAll() {
        List<Workday> workdays = service.findAll();
        List<WorkdayResponse> responses = workdays.stream().map(dtoMappers.toResponse).toList();
        return StructuredResponseEntityBuilder.success(responses);
    }

    public ResponseEntity<StructuredResponse> findById(Long id) {
        Workday workday = service.findById(id);
        WorkdayResponse response = dtoMappers.toResponse.apply(workday);
        return StructuredResponseEntityBuilder.success(response);
    }

    public ResponseEntity<StructuredResponse> save(WorkdaySaveRequest request) {
        Workday savedWorkday = service.save(request);
        WorkdayResponse response = dtoMappers.toResponse.apply(savedWorkday);
        return StructuredResponseEntityBuilder.success(response);
    }

    public ResponseEntity<StructuredResponse> update(Long id, WorkdaySaveRequest request) {
        Data data = service.update(id, request);
        data.map(dtoMappers.toResponse);
        return StructuredResponseEntityBuilder.success(data.get());
    }

    public ResponseEntity<StructuredResponse> deleteById(Long id) {
        service.deleteById(id);
        return StructuredResponseEntityBuilder.success();
    }
}
