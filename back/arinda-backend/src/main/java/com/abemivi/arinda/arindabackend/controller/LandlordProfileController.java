package com.abemivi.arinda.arindabackend.controller;

import com.abemivi.arinda.arindabackend.dto.profile.LandlordProfileResponse;
import com.abemivi.arinda.arindabackend.dto.profile.UpdateLandlordProfileRequest;
import com.abemivi.arinda.arindabackend.service.ProfileService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/landlord/profile")
@RequiredArgsConstructor
public class LandlordProfileController {
    private final ProfileService profileService;

    @GetMapping
    public ResponseEntity<LandlordProfileResponse> getLandlordProfile(Authentication authentication) {
        String email = authentication.getName();
        LandlordProfileResponse profile = profileService.getLandlordProfile(email);
        return ResponseEntity.ok(profile);
    }

    @PutMapping
    public ResponseEntity<LandlordProfileResponse> updateLandlordProfile(
            Authentication authentication,
            @Valid @RequestBody UpdateLandlordProfileRequest request) {
        String email = authentication.getName();
        LandlordProfileResponse updatedProfile = profileService.updateLandlordProfile(email, request);
        return ResponseEntity.ok(updatedProfile);
    }
}
