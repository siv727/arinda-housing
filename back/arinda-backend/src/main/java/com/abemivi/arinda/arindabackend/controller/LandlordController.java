package com.abemivi.arinda.arindabackend.controller;

import com.abemivi.arinda.arindabackend.dto.listing.CreateListingRequest;
import com.abemivi.arinda.arindabackend.dto.listing.ListingResponse;
import com.abemivi.arinda.arindabackend.dto.listingcards.LandlordListingCard;
import com.abemivi.arinda.arindabackend.dto.listingdetails.LandlordListingDetails;
import com.abemivi.arinda.arindabackend.entity.Listing;
import com.abemivi.arinda.arindabackend.entity.User;
import com.abemivi.arinda.arindabackend.entity.enums.ListingStatus;
import com.abemivi.arinda.arindabackend.service.CloudinaryService;
import com.abemivi.arinda.arindabackend.service.ListingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/landlord/listings")
@RequiredArgsConstructor
public class LandlordController {

    private final ListingService listingService;
    private final CloudinaryService cloudinaryService;

    @PostMapping
    public ResponseEntity<ListingResponse> createListing(
            @Valid @RequestBody CreateListingRequest request,
            @AuthenticationPrincipal User user) {

        try {
            Listing listing = listingService.createListing(request, user.getId());

            ListingResponse response = new ListingResponse(
                    listing.getId(),
                    listing.getTitle(),
                    listing.getDescription(),
                    listing.getPropertytype(),
                    listing.getRoomtype(),
                    listing.getListingstatus(),
                    "Listing created successfully");

            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ListingResponse(null, null, null, null, null, null,
                            "Failed to create listing: " + e.getMessage()));
        }
    }

    @PutMapping("/{listingId}")
    public ResponseEntity<ListingResponse> updateListing(
            @PathVariable Long listingId,
            @Valid @RequestBody CreateListingRequest request,
            @AuthenticationPrincipal User user) {

        try {
            Listing listing = listingService.updateListing(listingId, request, user.getId());

            ListingResponse response = new ListingResponse(
                    listing.getId(),
                    listing.getTitle(),
                    listing.getDescription(),
                    listing.getPropertytype(),
                    listing.getRoomtype(),
                    listing.getListingstatus(),
                    "Listing updated successfully");

            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ListingResponse(null, null, null, null, null, null,
                            e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ListingResponse(null, null, null, null, null, null,
                            "Failed to update listing: " + e.getMessage()));
        }
    }

    @GetMapping
    public ResponseEntity<List<LandlordListingCard>> getMyListings(
            @AuthenticationPrincipal User user) {

        List<LandlordListingCard> listings = listingService.getLandlordListings(user.getId());
        return ResponseEntity.ok(listings);
    }

    @GetMapping("/{listingId}")
    public ResponseEntity<LandlordListingDetails> getListingDetails(
            @PathVariable Long listingId,
            @AuthenticationPrincipal User user) {

        try {
            LandlordListingDetails details = listingService.getLandlordListingDetails(listingId, user.getId());
            return ResponseEntity.ok(details);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @DeleteMapping("/{listingId}")
    public ResponseEntity<Void> deleteListing(
            @PathVariable Long listingId,
            @AuthenticationPrincipal User user) {

        try {
            listingService.deleteListing(listingId, user.getId());
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PatchMapping("/{listingId}/status")
    public ResponseEntity<Void> updateListingStatus(
            @PathVariable Long listingId,
            @RequestParam ListingStatus status,
            @AuthenticationPrincipal User user) {

        try {
            listingService.updateListingStatus(listingId, user.getId(), status);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PostMapping("/upload-photos")
    public ResponseEntity<Map<String, Object>> uploadPhotos(
            @RequestParam("photos") List<MultipartFile> photos,
            @AuthenticationPrincipal User user) {

        try {
            List<String> photoUrls = cloudinaryService.uploadImages(photos, "arinda/listings");

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("urls", photoUrls);
            response.put("message", photos.size() + " photos uploaded successfully");

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("message", "Failed to upload photos: " + e.getMessage());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }
}
