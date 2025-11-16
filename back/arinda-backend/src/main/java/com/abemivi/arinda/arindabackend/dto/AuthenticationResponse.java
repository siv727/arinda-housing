package com.abemivi.arinda.arindabackend.dto;

import com.abemivi.arinda.arindabackend.entity.enums.Role;
import lombok.Builder;

@Builder
public record AuthenticationResponse(
        String token,
        Role role,
        Long id,
        String email,
        String firstname,
        String lastname
) {
}
