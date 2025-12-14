package com.abemivi.arinda.arindabackend.controller;

import com.abemivi.arinda.arindabackend.dto.application.ApplicationEligibilityResponse;
import com.abemivi.arinda.arindabackend.dto.application.ApplicationResponse;
import com.abemivi.arinda.arindabackend.dto.application.CreateApplicationRequest;
import com.abemivi.arinda.arindabackend.service.ApplicationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tenant/applications")
@RequiredArgsConstructor
public class ApplicationController {

    private final ApplicationService applicationService;

    /**
     * Check if the authenticated tenant is eligible to apply to a listing.
     * Returns eligibility status with reason and cooldown info if blocked.
     */
    @GetMapping("/eligibility")
    public ResponseEntity<?> checkEligibility(
            @RequestParam Long listingId,
            Authentication authentication) {
        try {
            String email = authentication.getName();
            ApplicationEligibilityResponse response = applicationService.checkEligibility(email, listingId);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse(e.getMessage()));
        }
    }

    @PostMapping
    public ResponseEntity<?> submitApplication(
            Authentication authentication,
            @Valid @RequestBody CreateApplicationRequest request) {
        try {
            String email = authentication.getName();
            ApplicationResponse response = applicationService.createApplication(email, request);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse(e.getMessage()));
        }
    }
    
    record ErrorResponse(String message) {}

    @GetMapping
    public ResponseEntity<List<ApplicationResponse>> getMyApplications(Authentication authentication) {
        String email = authentication.getName();
        List<ApplicationResponse> applications = applicationService.getMyApplications(email);
        return ResponseEntity.ok(applications);
    }
}

