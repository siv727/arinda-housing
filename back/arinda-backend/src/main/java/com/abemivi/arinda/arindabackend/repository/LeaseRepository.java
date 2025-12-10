package com.abemivi.arinda.arindabackend.repository;

import java.util.List;

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
           "JOIN l.application app " +
           "JOIN app.listing listing " +
           "WHERE listing.landlord.email = :landlordEmail " +
           "AND app.status = 'APPROVED' " +
           "ORDER BY l.startDate DESC")
    List<Lease> findByLandlordEmail(@Param("landlordEmail") String landlordEmail);
}
