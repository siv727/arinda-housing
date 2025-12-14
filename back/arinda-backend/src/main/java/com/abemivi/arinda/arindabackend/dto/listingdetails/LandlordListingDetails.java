package com.abemivi.arinda.arindabackend.dto.listingdetails;

import com.abemivi.arinda.arindabackend.dto.support.ReviewDetails;
import com.abemivi.arinda.arindabackend.entity.enums.ListingStatus;
import lombok.Builder;

import java.util.List;

@Builder
public record LandlordListingDetails(
        Long id,
        String mainphotourl,
        String title,
        String description, // Added
        String location,
        String propertytype,
        String roomtype,    // Added
        ListingStatus status,

        // Address Details (Added)
        String unit,
        String building,
        String address,
        String barangay,
        String city,
        String postcode,
        String province,

        // Pricing (Raw numbers for editing)
        String monthlyrent,      // Keep string for display
        Double monthlyRentValue, // Add number for form
        Double securitydeposit,
        Double appfee,
        Double petfee,
        Integer advancerent,

        // Lists (Added)
        List<String> photourls,
        List<Integer> leaseterms,
        List<String> inclusions,
        List<String> amenities,
        List<String> establishments,

        List<ReviewDetails> reviewdetails
) {}