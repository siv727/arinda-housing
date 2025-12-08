package com.abemivi.arinda.arindabackend.repository;

import com.abemivi.arinda.arindabackend.entity.Lease;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LeaseRepository extends JpaRepository<Lease, Long> {
    @Query("SELECT l FROM Lease l WHERE l.student.id = :studentId ORDER BY l.startDate DESC")
    List<Lease> findByStudentIdOrderByStartDateDesc(@Param("studentId") Long studentId);
}
