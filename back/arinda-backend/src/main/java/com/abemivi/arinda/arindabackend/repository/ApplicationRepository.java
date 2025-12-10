package com.abemivi.arinda.arindabackend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.abemivi.arinda.arindabackend.entity.Application;
import com.abemivi.arinda.arindabackend.entity.Landlord;
import com.abemivi.arinda.arindabackend.entity.Listing;
import com.abemivi.arinda.arindabackend.entity.Student;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {
    List<Application> findByStudent(Student student);
    boolean existsByStudentAndListing(Student student, Listing listing);
    Optional<Application> findByStudentAndListing(Student student, Listing listing);
    
    @Query("SELECT a FROM Application a WHERE a.listing.landlord = :landlord ORDER BY a.createdAt DESC")
    List<Application> findByListingLandlord(@Param("landlord") Landlord landlord);
}
