package com.gokdenizozkan.yalnizapp.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "vaccinations")
@Getter
@Setter
@RequiredArgsConstructor
public class Vaccination {
    @Id
    @GeneratedValue(generator = "VACCINATION_SEQ_GEN", strategy = GenerationType.SEQUENCE)
    @SequenceGenerator(name = "VACCINATION_SEQ_GEN", sequenceName = "VACCINATION_SEQ")
    private Long id;
    private String name;
    private String code;
    @Column(name = "administration_date")
    @Temporal(TemporalType.DATE)
    private LocalDate administrationDate;
    @Column(name = "expiration_date")
    @Temporal(TemporalType.DATE)
    private LocalDate expirationDate;

    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinColumn(name = "pet_id", referencedColumnName = "id")
    private Pet pet;

    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinColumn(name = "report_id", referencedColumnName = "id")
    private Report report;
}
