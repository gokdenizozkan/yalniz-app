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
import jakarta.persistence.OneToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "appointments")
@Getter
@Setter
@RequiredArgsConstructor
public class Appointment {
    @Id
    @GeneratedValue(generator = "APPOINTMENT_SEQ_GEN", strategy = GenerationType.SEQUENCE)
    @SequenceGenerator(name = "APPOINTMENT_SEQ_GEN", sequenceName = "APPOINTMENT_SEQ")
    private Long id;

    @Column(name = "start_date")
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime start;
    @Column(name = "end_date")
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime end;

    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH, CascadeType.DETACH})
    @JoinColumn(name = "pet_id", referencedColumnName = "id")
    private Pet pet;

    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH, CascadeType.DETACH})
    @JoinColumn(name = "vet_id", referencedColumnName = "id")
    private Vet vet;

    @OneToOne(mappedBy = "appointment", cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "report_id", referencedColumnName = "id")
    private Report report;
}
