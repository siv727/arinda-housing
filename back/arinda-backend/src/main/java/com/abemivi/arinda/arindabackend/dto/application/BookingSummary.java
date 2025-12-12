package com.abemivi.arinda.arindabackend.dto.application;

import com.abemivi.arinda.arindabackend.entity.enums.ApplicationStatus;
import lombok.Builder;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Builder
public record BookingSummary(
        Long id,
        String tenantName,
        String tenantEmail,
        String propertyTitle,
        String propertyAddress,
        LocalDate moveInDate,
        Integer leaseTerm,  // in months
        ApplicationStatus status,
        LocalDateTime bookedDate
) {}
