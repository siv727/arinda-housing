package com.abemivi.arinda.arindabackend.dto.listingcards;

import lombok.Builder;

import java.util.List;

@Builder
public record TenantListingCard(
                Long id,
                String mainphotourl,
                String title,
                String location,
                Double averagerating,
                int reviewcount,
                List<String> amenities,
                List<String> leaseterms,
                String monthlyrent,
                String propertytype,
                String roomtype)
{
}
