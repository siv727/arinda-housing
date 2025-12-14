package com.abemivi.arinda.arindabackend.dto.application;

import java.time.LocalDateTime;

import lombok.Builder;

@Builder
public record ApplicationEligibilityResponse(
        boolean canApply,
        String reason,              // "ELIGIBLE", "PENDING", "ACTIVE_LEASE", "COOLDOWN"
        LocalDateTime blockedUntil, // null if eligible or permanently blocked
        Long hoursRemaining         // null if eligible
) {}
