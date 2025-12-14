package com.abemivi.arinda.arindabackend.dto.dashboard;

import lombok.Builder;

@Builder
public record RecentListingDTO(
        Long id,
        String mainPhotoUrl,
        String title,
        String location, // "Barangay, City"
        String propertyType,
        String monthlyRent
) {
}
