package com.abemivi.arinda.arindabackend.controller;

import com.abemivi.arinda.arindabackend.dto.profile.ProfileResponse;
import com.abemivi.arinda.arindabackend.dto.profile.UpdateProfileRequest;
import com.abemivi.arinda.arindabackend.service.ProfileService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
@RequiredArgsConstructor
public class ProfileController {
    private final ProfileService profileService;

    @GetMapping
    public ResponseEntity<ProfileResponse> getProfile(Authentication authentication) {
        String email = authentication.getName();
        ProfileResponse profile = profileService.getProfile(email);
        return ResponseEntity.ok(profile);
    }

    @PutMapping
    public ResponseEntity<ProfileResponse> updateProfile(
            @Valid @RequestBody UpdateProfileRequest request,
            Authentication authentication
    ) {
        String email = authentication.getName();
        ProfileResponse updatedProfile = profileService.updateProfile(email, request);
        return ResponseEntity.ok(updatedProfile);
    }
}
