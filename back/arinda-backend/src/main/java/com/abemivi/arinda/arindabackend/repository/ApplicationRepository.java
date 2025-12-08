package com.abemivi.arinda.arindabackend.repository;

import com.abemivi.arinda.arindabackend.entity.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {
}
