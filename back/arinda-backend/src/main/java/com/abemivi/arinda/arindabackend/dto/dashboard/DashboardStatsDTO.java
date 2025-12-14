package com.abemivi.arinda.arindabackend.dto.dashboard;

import lombok.Builder;

@Builder
public record DashboardStatsDTO(
        long totalProperties,
        long totalTenants,
        long totalApplications,
        long pendingApplications
) {
}
