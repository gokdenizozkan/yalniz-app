package com.gokdenizozkan.yalnizapp.layer.repository;

import com.gokdenizozkan.yalnizapp.entity.Pet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PetRepository extends JpaRepository<Pet, Long> {
    List<Pet> findAllByOwnerId(Long id);

    List<Pet> findAllByNameContaining(String name);
}
