package com.abemivi.arinda.arindabackend.service;

import com.abemivi.arinda.arindabackend.dto.lease.LeaseResponse;
import com.abemivi.arinda.arindabackend.entity.Lease;
import com.abemivi.arinda.arindabackend.entity.Listing;
import com.abemivi.arinda.arindabackend.entity.Photo;
import com.abemivi.arinda.arindabackend.entity.User;
import com.abemivi.arinda.arindabackend.repository.LeaseRepository;
import com.abemivi.arinda.arindabackend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LeaseService {
    private final LeaseRepository leaseRepository;
    private final UserRepository userRepository;

    public List<LeaseResponse> getStudentLeases(String email, String filter) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Lease> leases = leaseRepository.findByStudentIdOrderByStartDateDesc(user.getId());

        return leases.stream()
                .map(this::mapToLeaseResponse)
                .filter(lease -> filterByStatus(lease, filter))
                .collect(Collectors.toList());
    }

    private LeaseResponse mapToLeaseResponse(Lease lease) {
        Listing listing = lease.getApplication().getListing();
        String status = determineLeaseStatus(lease.getStartDate(), lease.getEndDate());
        
        // Get first photo URL if available
        String photoUrl = listing.getPhotos().stream()
                .findFirst()          // Safely gets an Optional<Photo> from the Set
                .map(Photo::getUrl)   // If a photo exists, get its URL
                .orElse(null);        // Otherwise, return null

        // Build full address
        String address = String.format("%s, %s, %s",
                listing.getLocation().getAddress(),
                listing.getLocation().getBarangay(),
                listing.getLocation().getCity()
        );

        // Get landlord full name
        String landlordName = listing.getLandlord().getFirstname() + " " + 
                              listing.getLandlord().getLastname();

        return LeaseResponse.builder()
                .id(lease.getId())
                .listingId(listing.getId())
                .propertyName(listing.getTitle())
                .propertyAddress(address)
                .propertyType(listing.getPropertytype())
                .monthlyPrice((double) listing.getPrice().getMonthlyrent())
                .photoUrl(photoUrl)
                .startDate(lease.getStartDate())
                .endDate(lease.getEndDate())
                .landlordName(landlordName)
                .status(status)
                .build();
    }

    private String determineLeaseStatus(LocalDate startDate, LocalDate endDate) {
        LocalDate today = LocalDate.now();
        
        if (today.isAfter(endDate)) {
            return "past";
        } else {
            // Both upcoming and currently active leases are considered "current"
            return "current";
        }
    }

    private boolean filterByStatus(LeaseResponse lease, String filter) {
        if (filter == null || filter.equalsIgnoreCase("all")) {
            return true;
        }
        return lease.status().equalsIgnoreCase(filter);
    }
}
