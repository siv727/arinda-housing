package com.abemivi.arinda.arindabackend.controller;

import com.abemivi.arinda.arindabackend.dto.tenant.TenantResponse;
import com.abemivi.arinda.arindabackend.dto.tenant.UpdatePaymentStatusRequest;
import com.abemivi.arinda.arindabackend.service.TenantService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/landlord/tenants")
@RequiredArgsConstructor
public class TenantsController {
    private final TenantService tenantService;

    @GetMapping
    public ResponseEntity<List<TenantResponse>> getLandlordTenants(Authentication authentication) {
        String landlordEmail = authentication.getName();
        List<TenantResponse> tenants = tenantService.getLandlordTenants(landlordEmail);
        return ResponseEntity.ok(tenants);
    }

    @PatchMapping("/{leaseId}/payment-status")
    public ResponseEntity<TenantResponse> updatePaymentStatus(
            @PathVariable Long leaseId,
            @Valid @RequestBody UpdatePaymentStatusRequest request,
            Authentication authentication
    ) {
        String landlordEmail = authentication.getName();
        TenantResponse response = tenantService.updatePaymentStatus(landlordEmail, leaseId, request);
        return ResponseEntity.ok(response);
    }

    @PatchMapping("/{leaseId}/end-lease")
    public ResponseEntity<Void> endLease(
            @PathVariable Long leaseId,
            Authentication authentication
    ) {
        String landlordEmail = authentication.getName();
        tenantService.endLease(landlordEmail, leaseId);
        return ResponseEntity.noContent().build();
    }
}
