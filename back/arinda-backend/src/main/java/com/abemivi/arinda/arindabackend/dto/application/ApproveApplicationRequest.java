package com.abemivi.arinda.arindabackend.dto.application;

public record ApproveApplicationRequest(
        String message,
        String attachmentUrl  // Optional: for lease agreement or approval documents
) {}
