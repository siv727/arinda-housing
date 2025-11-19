package com.abemivi.arinda.arindabackend.repository;

import com.abemivi.arinda.arindabackend.entity.NeedsIncluded;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.Set;

@Repository
public interface NeedsIncludedRepository extends JpaRepository<NeedsIncluded, Long> {
    Optional<NeedsIncluded> findByName(String name);

    Set<NeedsIncluded> findByNameIn(Set<String> names);
}
