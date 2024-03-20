package com.gokdenizozkan.yalnizapp.dto.vet.mapper;

import com.gokdenizozkan.yalnizapp.dto.vet.response.VetResponse;
import com.gokdenizozkan.yalnizapp.dto.vet.response.VetResponseWithWorkdays;
import com.gokdenizozkan.yalnizapp.dto.workday.mapper.WorkdayResponseMapper;
import com.gokdenizozkan.yalnizapp.entity.Vet;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.function.Function;

@Component
@RequiredArgsConstructor
public class VetResponseWithWorkdaysMapper implements Function<Vet, VetResponseWithWorkdays> {
    private final WorkdayResponseMapper workdayResponseMapper;
    @Override
    public VetResponseWithWorkdays apply(Vet vet) {
        return new VetResponseWithWorkdays(
                vet.getId(),
                vet.getName(),
                vet.getPhone(),
                vet.getEmail(),
                vet.getAddress(),
                vet.getCity(),
                vet.getWorkdays().stream().map(workdayResponseMapper).toList()
        );
    }
}
