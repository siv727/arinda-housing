package com.abemivi.arinda.arindabackend.dto.dashboard;

import lombok.Builder;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Builder
public record RecentApplicationDTO(
        Long id,
        String applicantName,
        String applicantPhotoUrl,
        String listingTitle,
        LocalDateTime dateBooked,
        LocalDate moveInDate,
        String status
) {
}
