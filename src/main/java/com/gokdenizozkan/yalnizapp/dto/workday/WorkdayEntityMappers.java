package com.gokdenizozkan.yalnizapp.dto.workday;

import com.gokdenizozkan.yalnizapp.dto.workday.mapper.WorkdaySaveRequestDemapper;
import com.gokdenizozkan.yalnizapp.dto.workday.mapper.WorkdayUpdateRequestDemapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class WorkdayEntityMappers {
    public final WorkdaySaveRequestDemapper fromSaveRequest;
    public final WorkdayUpdateRequestDemapper fromUpdateRequest;
}
