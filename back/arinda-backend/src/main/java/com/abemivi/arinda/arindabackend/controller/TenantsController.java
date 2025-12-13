package com.abemivi.arinda.arindabackend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.abemivi.arinda.arindabackend.dto.lease.TenantResponse;
import com.abemivi.arinda.arindabackend.entity.Landlord;
import com.abemivi.arinda.arindabackend.service.TenantService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/landlord/tenants")
@RequiredArgsConstructor
public class TenantsController {
    private final TenantService tenantService;

    @GetMapping
    public ResponseEntity<List<TenantResponse>> getLandlordTenants(
            @AuthenticationPrincipal Landlord landlord) {
        List<TenantResponse> tenants = tenantService.getLandlordTenants(landlord.getId());
        return ResponseEntity.ok(tenants);
    }

    @PatchMapping("/{leaseId}/end-lease")
    public ResponseEntity<Void> endLease(
            @PathVariable Long leaseId,
            @AuthenticationPrincipal Landlord landlord) {
        tenantService.endLease(leaseId);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/{leaseId}/evict")
    public ResponseEntity<Void> evictTenant(
            @PathVariable Long leaseId,
            @AuthenticationPrincipal Landlord landlord) {
        tenantService.evictTenant(leaseId);
        return ResponseEntity.ok().build();
    }
}
