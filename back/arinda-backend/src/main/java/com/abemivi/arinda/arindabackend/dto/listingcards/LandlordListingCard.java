package com.abemivi.arinda.arindabackend.dto.listingcards;

import lombok.Builder;

@Builder
public record LandlordListingCard(
        Long id,
        String mainphotourl,
        String title,
        String location,
        String propertytype,
        String monthlyrent) {
}
