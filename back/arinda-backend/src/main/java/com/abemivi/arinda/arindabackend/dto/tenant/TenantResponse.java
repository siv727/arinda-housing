package com.abemivi.arinda.arindabackend.dto.tenant;

import java.time.LocalDate;

import com.abemivi.arinda.arindabackend.entity.enums.PaymentStatus;

public record TenantResponse(
        Long leaseId,
        TenantInfo tenant,
        PropertyInfo property,
        PaymentStatus paymentStatus,
        LocalDate startDate,
        LocalDate endDate,
        Double monthlyRent,
        String documentUrl
) {
    public record TenantInfo(
            Long id,
            String name,
            String email,
            String school
    ) {}

    public record PropertyInfo(
            Long id,
            String title,
            String address,
            String city,
            String imageUrl
    ) {}
}
