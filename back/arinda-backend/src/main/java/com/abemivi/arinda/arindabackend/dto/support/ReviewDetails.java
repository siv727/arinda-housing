package com.abemivi.arinda.arindabackend.dto.support;

import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public record ReviewDetails(
        Long id,
        Long listingId,
        int rating,
        String comment,
        String reviewername,
        String reviewerprofile,
        LocalDateTime createdat
) {
}
