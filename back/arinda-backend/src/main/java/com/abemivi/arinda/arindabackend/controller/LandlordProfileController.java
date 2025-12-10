package com.abemivi.arinda.arindabackend.controller;

import com.abemivi.arinda.arindabackend.dto.profile.LandlordProfileResponse;
import com.abemivi.arinda.arindabackend.dto.profile.UpdateLandlordProfileRequest;
import com.abemivi.arinda.arindabackend.service.LandlordProfileService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/landlord/profile")
@RequiredArgsConstructor
public class LandlordProfileController {
    private final LandlordProfileService landlordProfileService;

    @GetMapping
    public ResponseEntity<LandlordProfileResponse> getLandlordProfile(Authentication authentication) {
        String email = authentication.getName();
        LandlordProfileResponse profile = landlordProfileService.getLandlordProfile(email);
        return ResponseEntity.ok(profile);
    }

    @PutMapping
    public ResponseEntity<LandlordProfileResponse> updateLandlordProfile(
            Authentication authentication,
            @Valid @RequestBody UpdateLandlordProfileRequest request) {
        String email = authentication.getName();
        LandlordProfileResponse updatedProfile = landlordProfileService.updateLandlordProfile(email, request);
        return ResponseEntity.ok(updatedProfile);
    }
}
