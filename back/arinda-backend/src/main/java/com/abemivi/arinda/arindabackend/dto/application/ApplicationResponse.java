package com.abemivi.arinda.arindabackend.dto.application;

import com.abemivi.arinda.arindabackend.entity.enums.ApplicationStatus;
import lombok.Builder;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Builder
public record ApplicationResponse(
        Long id,
        Long listingId,
        String listingTitle,
        String listingAddress,
        LocalDate moveInDate,
        String applicantMessage,
        ApplicationStatus status,
        LocalDateTime createdAt,
        
        // Landlord response
        String responseMessage,
        String attachmentUrl,
        
        // Tenant info
        Long tenantId,
        String tenantName,
        String tenantEmail
) {}
