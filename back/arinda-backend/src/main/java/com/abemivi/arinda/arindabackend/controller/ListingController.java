package com.abemivi.arinda.arindabackend.controller;

import com.abemivi.arinda.arindabackend.dto.listingcards.TenantListingCard;
import com.abemivi.arinda.arindabackend.dto.listingdetails.TenantListingDetails;
import com.abemivi.arinda.arindabackend.service.ListingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/listings")
@RequiredArgsConstructor
public class ListingController {

    private final ListingService listingService;

    // Get all available listings
    @GetMapping
    public ResponseEntity<List<TenantListingCard>> getAllListings() {
        return ResponseEntity.ok(listingService.getAllListings());
    }

    // Get details of a specific listing
    @GetMapping("/{listingId}")
    public ResponseEntity<TenantListingDetails> getListingDetails(@PathVariable Long listingId) {
        return ResponseEntity.ok(listingService.getListingDetails(listingId));
    }
}