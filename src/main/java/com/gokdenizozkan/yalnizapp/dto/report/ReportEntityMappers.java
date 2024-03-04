package com.gokdenizozkan.yalnizapp.dto.report;

import com.gokdenizozkan.yalnizapp.dto.report.mapper.ReportSaveRequestDemapper;
import com.gokdenizozkan.yalnizapp.dto.report.mapper.ReportUpdateRequestDemapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ReportEntityMappers {
    public final ReportSaveRequestDemapper fromSaveRequest;
    public final ReportUpdateRequestDemapper fromUpdateRequest;
}
