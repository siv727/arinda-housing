package com.abemivi.arinda.arindabackend.dto.application;

import java.time.LocalDate;

public record ApproveApplicationRequest(
        String message,
        String attachmentUrl,  // Optional: for lease agreement or approval documents
        LocalDate confirmedMoveInDate  // Optional: landlord can adjust the move-in date
) {}
