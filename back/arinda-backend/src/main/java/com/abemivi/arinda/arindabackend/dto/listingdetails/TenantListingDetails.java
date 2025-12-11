package com.abemivi.arinda.arindabackend.dto.listingdetails;

import com.abemivi.arinda.arindabackend.dto.support.*;
import lombok.Builder;
import java.util.List;

@Builder
public record TenantListingDetails(
        Long id,
        List<PhotoDetails> photodetails,
        String title,
        String propertytype,
        String roomtype,
        String location,
        Double averagerating,
        int reviewcount,
        String hostname,
        String hostphonenumber,
        String hostemail,
        String description,
        List<String> inclusions,

        // CHANGED: From List<AmenityDetails> amenitydetails to List<String> amenities
        List<String> amenities,

        List<String> establishments,

        ReviewSummary reviewsummary,
        List<ReviewDetails> reviewdetails,
        LocationDetails locationdetails,
        String monthlyrent,
        List<String> leaseterms,
        PricingDetails pricingdetails
) {}