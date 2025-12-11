package com.abemivi.arinda.arindabackend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.abemivi.arinda.arindabackend.dto.application.ApproveApplicationRequest;
import com.abemivi.arinda.arindabackend.dto.application.BookingResponse;
import com.abemivi.arinda.arindabackend.dto.application.BookingSummary;
import com.abemivi.arinda.arindabackend.dto.application.RejectApplicationRequest;
import com.abemivi.arinda.arindabackend.service.ApplicationService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/landlord/bookings")
@RequiredArgsConstructor
public class BookingsController {

    private final ApplicationService applicationService;

    @GetMapping
    public ResponseEntity<List<BookingSummary>> getAllBookings(Authentication authentication) {
        String email = authentication.getName();
        List<BookingSummary> bookings = applicationService.getLandlordBookings(email);
        return ResponseEntity.ok(bookings);
    }

    @GetMapping("/{applicationId}")
    public ResponseEntity<?> getBookingDetails(
            Authentication authentication,
            @PathVariable Long applicationId) {
        try {
            String email = authentication.getName();
            BookingResponse booking = applicationService.getBookingDetails(email, applicationId);
            return ResponseEntity.ok(booking);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(new ErrorResponse(e.getMessage()));
        }
    }

    @PatchMapping("/{applicationId}/approve")
    public ResponseEntity<?> approveApplication(
            Authentication authentication,
            @PathVariable Long applicationId,
            @Valid @RequestBody ApproveApplicationRequest request) {
        try {
            String email = authentication.getName();
            BookingResponse response = applicationService.approveApplication(email, applicationId, request);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(new ErrorResponse(e.getMessage()));
        }
    }

    @PatchMapping("/{applicationId}/reject")
    public ResponseEntity<?> rejectApplication(
            Authentication authentication,
            @PathVariable Long applicationId,
            @Valid @RequestBody RejectApplicationRequest request) {
        try {
            String email = authentication.getName();
            BookingResponse response = applicationService.rejectApplication(email, applicationId, request);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(new ErrorResponse(e.getMessage()));
        }
    }

    record ErrorResponse(String message) {}
}
