package com.abemivi.arinda.arindabackend.dto.support;

import lombok.Builder;

@Builder
public record AmenityDetails(
        Long id,
        String name
) {
}
