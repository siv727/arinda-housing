package com.abemivi.arinda.arindabackend.service;

import com.abemivi.arinda.arindabackend.dto.dashboard.*;
import com.abemivi.arinda.arindabackend.entity.*;
import com.abemivi.arinda.arindabackend.entity.enums.ApplicationStatus;
import com.abemivi.arinda.arindabackend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final ListingRepository listingRepository;
    private final ApplicationRepository applicationRepository;
    private final LeaseRepository leaseRepository;

    public DashboardStatsDTO getStats(Long landlordId) {
        return DashboardStatsDTO.builder()
                .totalProperties(listingRepository.countByLandlordId(landlordId))
                .totalTenants(leaseRepository.countDistinctTenantsByLandlordId(landlordId))
                .totalApplications(applicationRepository.countByListingLandlordId(landlordId))
                .pendingApplications(applicationRepository.countByListingLandlordIdAndStatus(landlordId, ApplicationStatus.PENDING))
                .build();
    }

    public List<RecentApplicationDTO> getRecentApplications(Long landlordId) {
        // Simple call - no Pageable needed
        List<Application> apps = applicationRepository.findTop3ByListingLandlordIdOrderByCreatedAtDesc(landlordId);

        return apps.stream().map(app -> {
            String fullName = app.getStudent().getFirstname() + " " + app.getStudent().getLastname();
            // Fallback avatar if none exists
            String photoUrl = "https://ui-avatars.com/api/?name=" + fullName + "&background=random";

            return RecentApplicationDTO.builder()
                    .id(app.getId())
                    .applicantName(fullName)
                    .applicantPhotoUrl(photoUrl)
                    .listingTitle(app.getListing().getTitle())
                    .dateBooked(app.getCreatedAt())
                    .status(app.getStatus().name())
                    .build();
        }).collect(Collectors.toList());
    }

    public List<RecentListingDTO> getRecentListings(Long landlordId) {
        // Simple call - no Pageable needed
        List<Listing> listings = listingRepository.findTop3ByLandlordIdOrderByCreatedatDesc(landlordId);

        return listings.stream().map(listing -> {
            // Get first photo safely
            String photoUrl = listing.getPhotos().stream()
                    .findFirst()
                    .map(Photo::getUrl)
                    .orElse("https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800");

            String location = listing.getLocation().getBarangay() + ", " + listing.getLocation().getCity();

            return RecentListingDTO.builder()
                    .id(listing.getId())
                    .mainPhotoUrl(photoUrl)
                    .title(listing.getTitle())
                    .location(location)
                    .propertyType(listing.getPropertytype())
                    .monthlyRent("₱" + listing.getPrice().getMonthlyrent() + "/mo")
                    .build();
        }).collect(Collectors.toList());
    }
}