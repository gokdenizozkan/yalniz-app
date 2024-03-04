package com.gokdenizozkan.yalnizapp.dto.workday.mapper;

import com.gokdenizozkan.yalnizapp.dto.workday.response.WorkdayResponse;
import com.gokdenizozkan.yalnizapp.entity.Workday;
import org.springframework.stereotype.Component;

import java.util.function.Function;

@Component
public class WorkdayResponseMapper implements Function<Workday, WorkdayResponse> {
        @Override
        public WorkdayResponse apply(Workday workday) {
            return new WorkdayResponse(
                    workday.getId(),
                    workday.getDate(),
                    workday.getVet().getId()
            );
        }
}
