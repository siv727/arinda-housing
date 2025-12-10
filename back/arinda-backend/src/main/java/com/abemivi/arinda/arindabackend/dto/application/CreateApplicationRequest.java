package com.abemivi.arinda.arindabackend.dto.application;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record CreateApplicationRequest(
        @NotNull(message = "Listing ID is required")
        Long listingId,

        @NotNull(message = "Move-in date is required")
        @Future(message = "Move-in date must be in the future")
        LocalDate moveInDate,

        String applicantMessage,

        @NotNull(message = "Phone number is required")
        String phoneNumber
) {}
