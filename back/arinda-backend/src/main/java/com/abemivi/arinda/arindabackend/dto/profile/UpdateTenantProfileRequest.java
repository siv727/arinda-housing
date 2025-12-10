package com.abemivi.arinda.arindabackend.dto.profile;

import jakarta.validation.constraints.NotBlank;

public record UpdateTenantProfileRequest(
        @NotBlank(message = "First name is required")
        String firstname,
        
        @NotBlank(message = "Last name is required")
        String lastname,
        
        String school,
        
        String studentid
) {}
