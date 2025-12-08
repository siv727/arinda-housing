package com.abemivi.arinda.arindabackend.controller;

import com.abemivi.arinda.arindabackend.dto.lease.LeaseResponse;
import com.abemivi.arinda.arindabackend.service.LeaseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/leases")
@RequiredArgsConstructor
public class LeaseController {
    private final LeaseService leaseService;

    @GetMapping
    public ResponseEntity<List<LeaseResponse>> getStudentLeases(
            @RequestParam(required = false, defaultValue = "all") String filter,
            Authentication authentication
    ) {
        String email = authentication.getName();
        List<LeaseResponse> leases = leaseService.getStudentLeases(email, filter);
        return ResponseEntity.ok(leases);
    }
}
