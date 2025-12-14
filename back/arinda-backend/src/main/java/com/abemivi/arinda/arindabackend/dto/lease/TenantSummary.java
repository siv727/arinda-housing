package com.abemivi.arinda.arindabackend.dto.lease;

import com.abemivi.arinda.arindabackend.entity.enums.LeaseStatus;
import lombok.Builder;

import java.time.LocalDate;

@Builder
public record TenantSummary(
        Long leaseId,
        // Lightweight tenant info for table
        TenantInfo tenant,
        // Lightweight property info for table
        PropertyInfo property,
        // Essential lease info for table
        LeaseStatus leaseStatus,
        Double monthlyRent,
        LocalDate startDate
) {
    @Builder
    public record TenantInfo(
            Long id,
            String name,
            String email
    ) {}

    @Builder
    public record PropertyInfo(
            Long id,
            String title,
            String address
    ) {}
}
