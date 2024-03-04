package com.gokdenizozkan.yalnizapp.dto.report;

import com.gokdenizozkan.yalnizapp.dto.report.mapper.ReportResponseMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ReportDtoMappers {
    public final ReportResponseMapper toResponse;
}
