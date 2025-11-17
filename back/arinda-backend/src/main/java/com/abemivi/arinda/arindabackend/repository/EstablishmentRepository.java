package com.abemivi.arinda.arindabackend.repository;

import com.abemivi.arinda.arindabackend.entity.Establishment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.Set;

@Repository
public interface EstablishmentRepository extends JpaRepository<Establishment, Long> {
    Optional<Establishment> findByName(String name);

    Set<Establishment> findByNameIn(Set<String> names);
}
