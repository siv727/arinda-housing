package com.abemivi.arinda.arindabackend.dto.application;

import com.abemivi.arinda.arindabackend.entity.enums.ApplicationStatus;
import lombok.Builder;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Builder
public record ApplicationResponse(
        Long id,
        Long listingId,
        String mainphotourl,
        String listingTitle,
        String listingAddress,
        String propertyPrice,
        LocalDate moveInDate,
        Integer leaseTerm,
        String phoneNumber,
        String applicantMessage,
        ApplicationStatus status,
        LocalDateTime createdAt,
        
        // Landlord response
        String responseMessage,
        String attachmentUrl,
        
        // Landlord info (minimal for display)
        String landlordName
) {}
