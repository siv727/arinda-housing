package com.abemivi.arinda.arindabackend.mapper;

import com.abemivi.arinda.arindabackend.dto.listingcards.LandlordListingCard;
import com.abemivi.arinda.arindabackend.dto.listingcards.TenantListingCard;
import com.abemivi.arinda.arindabackend.dto.listingdetails.LandlordListingDetails;
import com.abemivi.arinda.arindabackend.dto.listingdetails.TenantListingDetails;
import com.abemivi.arinda.arindabackend.dto.support.*;
import com.abemivi.arinda.arindabackend.entity.*;
import com.abemivi.arinda.arindabackend.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Collection; // Important Import
import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class ListingMapper {

    private final ReviewRepository reviewRepository;

    // --- LANDLORD MAPPINGS ---

    public LandlordListingCard toLandlordCardDTO(Listing listing) {
        String photoUrl = listing.getPhotos().stream()
                .findFirst()
                .map(Photo::getUrl)
                .orElse(null);

        return LandlordListingCard.builder()
                .id(listing.getId())
                .mainphotourl(photoUrl)
                .title(listing.getTitle())
                .location(listing.getLocation().getCity() + ", " + listing.getLocation().getProvince())
                .propertytype(listing.getPropertytype())
                .monthlyrent("₱" + listing.getPrice().getMonthlyrent() + "/month")
                .build();
    }

    public LandlordListingDetails toLandlordDetailsDTO(Listing listing) {
        List<ReviewDetails> reviews = listing.getReviews().stream()
                .sorted((r1, r2) -> r2.getCreatedat().compareTo(r1.getCreatedat()))
                .map(this::toReviewDTO)
                .collect(Collectors.toList());

        String photoUrl = listing.getPhotos().stream()
                .findFirst()
                .map(Photo::getUrl)
                .orElse(null);

        return LandlordListingDetails.builder()
                .id(listing.getId())
                .mainphotourl(photoUrl)
                .title(listing.getTitle())
                .location(listing.getLocation().getCity() + ", " + listing.getLocation().getProvince())
                .propertytype(listing.getPropertytype())
                .status(listing.getListingstatus())
                .monthlyrent("₱" + listing.getPrice().getMonthlyrent() + "/month")
                .reviewdetails(reviews)
                .build();
    }

    // --- TENANT MAPPINGS ---

    public TenantListingCard toTenantCardDTO(Listing listing) {
        Double avgRating = reviewRepository.findAverageRatingByListingId(listing.getId());
        long reviewCount = reviewRepository.countByListingId(listing.getId());

        List<String> amenityNames = listing.getAmenities().stream()
                .limit(3)
                .collect(Collectors.toList());

        if (listing.getAmenities().size() > 3) {
            amenityNames.add("+" + (listing.getAmenities().size() - 3) + " more");
        }

        // FIX: Handle Set<LeaseTerm> sorting
        List<String> leaseTerms = listing.getLeaseterms().stream()
                .map(LeaseTerm::getMonths)
                .sorted()
                .map(t -> t + " month" + (t > 1 ? "s" : ""))
                .collect(Collectors.toList());

        String photoUrl = listing.getPhotos().stream()
                .findFirst()
                .map(Photo::getUrl)
                .orElse(null);

        return TenantListingCard.builder()
                .id(listing.getId())
                .mainphotourl(photoUrl)
                .title(listing.getTitle())
                .location(listing.getLocation().getCity() + ", " + listing.getLocation().getProvince())
                .averagerating(avgRating)
                .reviewcount((int) reviewCount)
                .amenities(amenityNames)
                .leaseterms(leaseTerms)
                .monthlyrent("₱" + listing.getPrice().getMonthlyrent() + "/month")
                .propertytype(listing.getPropertytype())
                .roomtype(listing.getRoomtype())
                .build();
    }

    public TenantListingDetails toTenantDetailsDTO(Listing listing) {
        Double avgRating = reviewRepository.findAverageRatingByListingId(listing.getId());
        long reviewCount = reviewRepository.countByListingId(listing.getId());

        // FIX: Stream works on Set, returns List
        List<ReviewDetails> reviews = listing.getReviews().stream()
                .sorted((r1, r2) -> r2.getCreatedat().compareTo(r1.getCreatedat()))
                .map(this::toReviewDTO)
                .collect(Collectors.toList());

        List<String> leaseTerms = listing.getLeaseterms().stream()
                .map(LeaseTerm::getMonths)
                .sorted()
                .map(t -> t + " month" + (t > 1 ? "s" : ""))
                .collect(Collectors.toList());

        return TenantListingDetails.builder()
                .id(listing.getId())
                .photodetails(listing.getPhotos().stream().map(this::toPhotoDTO).collect(Collectors.toList()))
                .title(listing.getTitle())
                .propertytype(listing.getPropertytype())
                .roomtype(listing.getRoomtype())
                .location(listing.getLocation().getCity() + ", " + listing.getLocation().getProvince())
                .averagerating(avgRating)
                .reviewcount((int) reviewCount)
                // HOST INFO (Works now because of JOIN FETCH l.landlord)
                .hostname(listing.getLandlord().getFirstname() + " " + listing.getLandlord().getLastname())
                .hostphonenumber(listing.getLandlord().getPhonenumber())
                .hostemail(listing.getLandlord().getEmail())
                .description(listing.getDescription())
                .inclusions(new ArrayList<>(listing.getInclusions()))
                .amenities(new ArrayList<>(listing.getAmenities()))
                .reviewsummary(toReviewSummaryDTO(listing))
                .reviewdetails(reviews)
                .locationdetails(toLocationDTO(listing))
                .monthlyrent("₱" + listing.getPrice().getMonthlyrent() + "/month")
                .leaseterms(leaseTerms)
                .pricingdetails(toPricingDTO(listing))
                .build();
    }

    // --- SUPPORT METHODS ---

    private PhotoDetails toPhotoDTO(Photo photo) {
        return PhotoDetails.builder()
                .id(photo.getId())
                .url(photo.getUrl())
                .build();
    }

    private ReviewDetails toReviewDTO(Review review) {
        return ReviewDetails.builder()
                .id(review.getId())
                .rating(review.getRating())
                .comment(review.getComment())
                .reviewername(review.getStudent().getFirstname() + " " + review.getStudent().getLastname())
                .createdat(review.getCreatedat())
                .build();
    }

    private PricingDetails toPricingDTO(Listing listing) {
        Price price = listing.getPrice();

        return PricingDetails.builder()
                .monthlyrent(price.getMonthlyrent())
                .securitydeposit(price.getSecuritydeposit())
                .appfee(price.getAppfee() > 0 ? price.getAppfee() : null)
                .petfee(price.getPetfee() > 0 ? price.getPetfee() : null)
                .advancerent(price.getAdvancerent() > 0 ? price.getAdvancerent() : null)
                .advancerentcost(price.getAdvancerent() > 0 ? price.getAdvancerentCost() : null) // Use Entity Method
                .totalmoveincost(price.getTotalMoveinCost()) // Use Entity Method
                .build();
    }

    private LocationDetails toLocationDTO(Listing listing) {
        return LocationDetails.builder()
                .address(listing.getLocation().getAddress())
                .barangay(listing.getLocation().getBarangay())
                .city(listing.getLocation().getCity())
                .province(listing.getLocation().getProvince())
                .build();
    }

    private ReviewSummary toReviewSummaryDTO(Listing listing) {
        // FIX: Accept generic Collection to handle both List and Set
        Collection<Review> reviews = listing.getReviews();

        return ReviewSummary.builder()
                .averagerating(reviewRepository.findAverageRatingByListingId(listing.getId()))
                .totalreviews(reviews.size())
                .fivestarcount((int) reviews.stream().filter(r -> r.getRating() == 5).count())
                .fourstarcount((int) reviews.stream().filter(r -> r.getRating() == 4).count())
                .threestarcount((int) reviews.stream().filter(r -> r.getRating() == 3).count())
                .twostarcount((int) reviews.stream().filter(r -> r.getRating() == 2).count())
                .onestarcount((int) reviews.stream().filter(r -> r.getRating() == 1).count())
                .build();
    }
}