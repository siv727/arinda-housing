package com.abemivi.arinda.arindabackend.dto.profile;

import com.abemivi.arinda.arindabackend.entity.enums.Role;
import lombok.Builder;

@Builder
public record TenantProfileResponse(
        Long id,
        String email,
        String firstname,
        String lastname,
        Role role,
        String school,
        String studentid
) {}
