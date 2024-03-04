package com.gokdenizozkan.yalnizapp.dto.workday;

import com.gokdenizozkan.yalnizapp.dto.workday.mapper.WorkdayResponseMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class WorkdayDtoMappers {
    public final WorkdayResponseMapper toResponse;
}
