package com.abemivi.arinda.arindabackend.entity.enums;

public enum ApplicationStatus {
    PENDING,
    APPROVED,
    REJECTED,
    COMPLETED,  // Lease ended normally
    EVICTED,    // Tenant was evicted
}
