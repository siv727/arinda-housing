package com.abemivi.arinda.arindabackend.repository;

import com.abemivi.arinda.arindabackend.entity.LeaseTerm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LeaseTermRepository extends JpaRepository<LeaseTerm, Long> {

    List<LeaseTerm> findByListingId(Long listingId);

    void deleteByListingId(Long listingId);
}
