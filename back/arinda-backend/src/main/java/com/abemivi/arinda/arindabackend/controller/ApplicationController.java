package com.abemivi.arinda.arindabackend.controller;

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

    @PostMapping
    public ResponseEntity<ApplicationResponse> submitApplication(
            Authentication authentication,
            @Valid @RequestBody CreateApplicationRequest request) {
        String email = authentication.getName();
        ApplicationResponse response = applicationService.createApplication(email, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    public ResponseEntity<List<ApplicationResponse>> getMyApplications(Authentication authentication) {
        String email = authentication.getName();
        List<ApplicationResponse> applications = applicationService.getMyApplications(email);
        return ResponseEntity.ok(applications);
    }
}
