package com.abemivi.arinda.arindabackend.dto.support;

import lombok.Builder;

@Builder
public record LocationDetails(
                String address,
                String barangay,
                String city,
                String province) {
}
