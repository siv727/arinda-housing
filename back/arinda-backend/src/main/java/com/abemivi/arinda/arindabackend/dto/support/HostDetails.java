package com.abemivi.arinda.arindabackend.dto.support;

import lombok.Builder;

@Builder
public record HostDetails(
        Long id,
        String name,
        String email,
        String phonenumber,
        String yearshosting
) {
}
