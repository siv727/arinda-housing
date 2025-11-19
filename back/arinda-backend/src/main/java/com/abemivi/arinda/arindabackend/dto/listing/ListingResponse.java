package com.abemivi.arinda.arindabackend.dto.listing;

import com.abemivi.arinda.arindabackend.entity.enums.ListingStatus;

public record ListingResponse(
        Long id,
        String title,
        String description,
        String propertytype,
        String roomtype,
        ListingStatus status,
        String message) {
}
