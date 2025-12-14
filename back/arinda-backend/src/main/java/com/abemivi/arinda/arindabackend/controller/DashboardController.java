package com.abemivi.arinda.arindabackend.controller;

import com.abemivi.arinda.arindabackend.dto.dashboard.DashboardStatsDTO;
import com.abemivi.arinda.arindabackend.dto.dashboard.RecentApplicationDTO;
import com.abemivi.arinda.arindabackend.dto.dashboard.RecentListingDTO;
import com.abemivi.arinda.arindabackend.entity.User;
import com.abemivi.arinda.arindabackend.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/landlord/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping("/stats")
    public ResponseEntity<DashboardStatsDTO> getStats(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(dashboardService.getStats(user.getId()));
    }

    @GetMapping("/recent-applications")
    public ResponseEntity<List<RecentApplicationDTO>> getRecentApplications(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(dashboardService.getRecentApplications(user.getId()));
    }

    @GetMapping("/recent-listings")
    public ResponseEntity<List<RecentListingDTO>> getRecentListings(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(dashboardService.getRecentListings(user.getId()));
    }
}