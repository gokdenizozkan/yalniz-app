package com.gokdenizozkan.yalnizapp.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "reports")
@Getter
@Setter
@RequiredArgsConstructor
public class Report {
    @Id
    @GeneratedValue(generator = "REPORT_SEQ_GEN", strategy = GenerationType.SEQUENCE)
    @SequenceGenerator(name = "REPORT_SEQ_GEN", sequenceName = "REPORT_SEQ")
    private Long id;

    private String title;
    private String diagnosis;
    private Double cost;

    @OneToOne
    @JoinColumn(name = "appointment_id", referencedColumnName = "id")
    private Appointment appointment;

    @OneToMany(mappedBy = "report")
    private List<Vaccination> vaccinations;
}
