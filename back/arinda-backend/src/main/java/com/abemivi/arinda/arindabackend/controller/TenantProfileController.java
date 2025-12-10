package com.abemivi.arinda.arindabackend.controller;

import com.abemivi.arinda.arindabackend.dto.profile.TenantProfileResponse;
import com.abemivi.arinda.arindabackend.dto.profile.UpdateTenantProfileRequest;
import com.abemivi.arinda.arindabackend.service.TenantProfileService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tenant/profile")
@RequiredArgsConstructor
public class TenantProfileController {
    private final TenantProfileService tenantProfileService;

    @GetMapping
    public ResponseEntity<TenantProfileResponse> getTenantProfile(Authentication authentication) {
        String email = authentication.getName();
        TenantProfileResponse profile = tenantProfileService.getTenantProfile(email);
        return ResponseEntity.ok(profile);
    }

    @PutMapping
    public ResponseEntity<TenantProfileResponse> updateTenantProfile(
            @Valid @RequestBody UpdateTenantProfileRequest request,
            Authentication authentication
    ) {
        String email = authentication.getName();
        TenantProfileResponse updatedProfile = tenantProfileService.updateTenantProfile(email, request);
        return ResponseEntity.ok(updatedProfile);
    }
}
