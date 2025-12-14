package com.abemivi.arinda.arindabackend.dto.lease;

import com.abemivi.arinda.arindabackend.entity.enums.LeaseStatus;
import lombok.Builder;

import java.time.LocalDate;

@Builder
public record TenantResponse(
        Long leaseId,
        // Tenant/Student info
        TenantInfo tenant,
        // Property/Listing info
        PropertyInfo property,
        // Lease details
        LocalDate startDate,
        LocalDate endDate,
        LeaseStatus leaseStatus,
        String documentUrl,
        // Additional info from application
        String phoneNumber,
        Integer leaseTerm,
        Double monthlyRent
) {
    @Builder
    public record TenantInfo(
            Long id,
            String name,
            String email,
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
