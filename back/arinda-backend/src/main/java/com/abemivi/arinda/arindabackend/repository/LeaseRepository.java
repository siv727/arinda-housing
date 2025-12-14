package com.abemivi.arinda.arindabackend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.abemivi.arinda.arindabackend.entity.Lease;

@Repository
public interface LeaseRepository extends JpaRepository<Lease, Long> {
    @Query("SELECT l FROM Lease l WHERE l.student.id = :studentId ORDER BY l.startDate DESC")
    List<Lease> findByStudentIdOrderByStartDateDesc(@Param("studentId") Long studentId);

    @Query("SELECT l FROM Lease l " +
           "JOIN FETCH l.student s " +
           "JOIN FETCH l.application a " +
           "JOIN FETCH a.listing lst " +
           "JOIN FETCH lst.landlord ll " +
           "WHERE ll.id = :landlordId " +
           "ORDER BY l.startDate DESC")
    List<Lease> findByLandlordIdWithDetails(@Param("landlordId") Long landlordId);
    
    @Query("SELECT l FROM Lease l WHERE l.application.id = :applicationId")
    Optional<Lease> findByApplicationId(@Param("applicationId") Long applicationId);

    // Custom query to count distinct students who have leases with this landlord
    @Query("SELECT COUNT(DISTINCT l.application.student.id) FROM Lease l WHERE l.application.listing.landlord.id = :landlordId")
    long countDistinctTenantsByLandlordId(@Param("landlordId") Long landlordId);
}
