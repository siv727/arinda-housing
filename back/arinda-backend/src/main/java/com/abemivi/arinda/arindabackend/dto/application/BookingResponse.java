package com.abemivi.arinda.arindabackend.dto.application;

import com.abemivi.arinda.arindabackend.entity.enums.ApplicationStatus;
import lombok.Builder;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Builder
public record BookingResponse(
        Long id,
        
        // Tenant/Student info
        TenantInfo tenant,
        
        // Property/Listing info
        PropertyInfo property,
        
        // Application details
        LocalDate checkIn,  // moveInDate
        ApplicationStatus status,
        LocalDateTime bookedDate,  // createdAt
        String applicantMessage,
        String responseMessage,  // landlord's approval/rejection message
        String attachmentUrl  // lease document or approval attachment
) {
    @Builder
    public record TenantInfo(
            Long id,
            String name,
            String email,
            String phone,
            String studentId,
            String university
    ) {}
    
    @Builder
    public record PropertyInfo(
            Long id,
            String title,
            String address
    ) {}
}
