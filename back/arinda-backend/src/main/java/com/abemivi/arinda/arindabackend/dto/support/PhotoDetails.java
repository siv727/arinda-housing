package com.abemivi.arinda.arindabackend.dto.support;

import lombok.Builder;

@Builder
public record PhotoDetails(
        Long id,
        String url
) {
}
