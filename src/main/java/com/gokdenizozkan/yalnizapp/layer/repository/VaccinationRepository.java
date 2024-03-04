package com.gokdenizozkan.yalnizapp.layer.repository;

import com.gokdenizozkan.yalnizapp.entity.Vaccination;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface VaccinationRepository extends JpaRepository<Vaccination, Long> {
    List<Vaccination> findAllByPetIdOrderByExpirationDateDesc(Long petId);

    List<Vaccination> findAllByExpirationDateBetween(LocalDate startDate, LocalDate endDate);

    Boolean existsVaccinationByPetIdAndCodeAndAdministrationDateGreaterThanEqual(Long petId, String code, LocalDate administrationDate);

    default Boolean existsVaccinationCurrentlyIntact(Long petId, String code, LocalDate administrationDate) {
        return existsVaccinationByPetIdAndCodeAndAdministrationDateGreaterThanEqual(petId, code, administrationDate);
    }
}
