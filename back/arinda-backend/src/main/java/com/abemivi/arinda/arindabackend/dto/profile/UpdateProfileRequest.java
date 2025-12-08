package com.abemivi.arinda.arindabackend.dto.profile;

import jakarta.validation.constraints.NotBlank;

public record UpdateProfileRequest(
        @NotBlank(message = "First name is required")
        String firstname,
        
        @NotBlank(message = "Last name is required")
        String lastname,
        
        String school,
        
        String studentid
) {}
