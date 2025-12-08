package com.abemivi.arinda.arindabackend.dto.lease;

import lombok.Builder;

import java.time.LocalDate;

@Builder
public record LeaseResponse(
        Long id,
        Long listingId,
        String propertyName,
        String propertyAddress,
        String propertyType,
        Double monthlyPrice,
        String photoUrl,
        LocalDate startDate,
        LocalDate endDate,
        String landlordName,
        String status // "current" or "past"
) {}
