package com.abemivi.arinda.arindabackend.dto.application;

import jakarta.validation.constraints.NotBlank;

public record RejectApplicationRequest(
        @NotBlank(message = "Rejection message is required")
        String message
) {}
