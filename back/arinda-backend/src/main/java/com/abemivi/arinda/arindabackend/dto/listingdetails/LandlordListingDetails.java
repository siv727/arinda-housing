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
                String location,
                String propertytype,
                ListingStatus status,
                String monthlyrent,
                List<ReviewDetails> reviewdetails) {
}