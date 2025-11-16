package com.abemivi.arinda.arindabackend.mapper;

import com.abemivi.arinda.arindabackend.dto.listingcards.LandlordListingCard;
import com.abemivi.arinda.arindabackend.dto.listingcards.TenantListingCard;
import com.abemivi.arinda.arindabackend.dto.listingdetails.LandlordListingDetails;
import com.abemivi.arinda.arindabackend.dto.listingdetails.TenantListingDetails;
import com.abemivi.arinda.arindabackend.dto.support.*;
import com.abemivi.arinda.arindabackend.entity.Listing;
import com.abemivi.arinda.arindabackend.entity.Photo;
import com.abemivi.arinda.arindabackend.entity.Review;
import com.abemivi.arinda.arindabackend.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class ListingMapper {

    private final ReviewRepository reviewRepository;

    // LANDLORD MAPPINGS

    public LandlordListingCard toLandlordCardDTO(Listing listing) {
        return LandlordListingCard.builder()
                .id(listing.getId())
                .mainphotourl(listing.getPhotos().isEmpty() ? null : listing.getPhotos().get(0).getUrl())
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

        return LandlordListingDetails.builder()
                .id(listing.getId())
                .mainphotourl(listing.getPhotos().isEmpty() ? null : listing.getPhotos().get(0).getUrl())
                .title(listing.getTitle())
                .location(listing.getLocation().getCity() + ", " + listing.getLocation().getProvince())
                .propertytype(listing.getPropertytype())
                .status(listing.getListingstatus())
                .monthlyrent("₱" + listing.getPrice().getMonthlyrent() + "/month")
                .reviewdetails(reviews)
                .build();
    }

    // TENANT MAPPINGS

    public TenantListingCard toTenantCardDTO(Listing listing) {
        Double avgRating = reviewRepository.findAverageRatingByListingId(listing.getId());
        long reviewCount = reviewRepository.countByListingId(listing.getId());

        List<String> amenityNames = listing.getAmenities().stream()
                .limit(3)
                .map(a -> a.getName())
                .collect(Collectors.toList());

        if (listing.getAmenities().size() > 3) {
            amenityNames.add("+" + (listing.getAmenities().size() - 3) + " more");
        }

        List<String> leaseTerms = listing.getLeaseterms().stream()
                .map(lt -> lt.getMonths())
                .sorted()
                .map(t -> t + " month" + (t > 1 ? "s" : ""))
                .collect(Collectors.toList());

        return TenantListingCard.builder()
                .id(listing.getId())
                .mainphotourl(listing.getPhotos().isEmpty() ? null : listing.getPhotos().get(0).getUrl())
                .title(listing.getTitle())
                .location(listing.getLocation().getCity() + ", " + listing.getLocation().getProvince())
                .averagerating(avgRating)
                .reviewcount((int) reviewCount)
                .amenities(amenityNames)
                .leaseterms(leaseTerms)
                .monthlyrent("₱" + listing.getPrice().getMonthlyrent() + "/month")
                .build();
    }

    public TenantListingDetails toTenantDetailsDTO(Listing listing) {
        Double avgRating = reviewRepository.findAverageRatingByListingId(listing.getId());
        long reviewCount = reviewRepository.countByListingId(listing.getId());

        List<ReviewDetails> reviews = listing.getReviews().stream()
                .sorted((r1, r2) -> r2.getCreatedat().compareTo(r1.getCreatedat()))
                .map(this::toReviewDTO)
                .collect(Collectors.toList());

        List<String> leaseTerms = listing.getLeaseterms().stream()
                .map(lt -> lt.getMonths())
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
                .hostname(listing.getLandlord().getFirstname() + " " + listing.getLandlord().getLastname())
                .hostphonenumber(listing.getLandlord().getPhonenumber())
                .hostemail(listing.getLandlord().getEmail())
                .description(listing.getDescription())
                .inclusions(listing.getInclusions().stream().map(i -> i.getName()).collect(Collectors.toList()))
                .amenitydetails(listing.getAmenities().stream().map(this::toAmenityDTO).collect(Collectors.toList()))
                .reviewsummary(toReviewSummaryDTO(listing))
                .reviewdetails(reviews)
                .locationdetails(toLocationDTO(listing))
                .monthlyrent("₱" + listing.getPrice().getMonthlyrent() + "/month")
                .leaseterms(leaseTerms)
                .pricingdetails(toPricingDTO(listing))
                .build();
    }

    // SUPPORTING MAPPERS

    private PhotoDetails toPhotoDTO(Photo photo) {
        return PhotoDetails.builder()
                .id(photo.getId())
                .url(photo.getUrl())
                .build();
    }

    private AmenityDetails toAmenityDTO(com.abemivi.arinda.arindabackend.entity.Amenity amenity) {
        return AmenityDetails.builder()
                .id(amenity.getId())
                .name(amenity.getName())
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
        int advanceRentCost = listing.getPrice().getAdvancerent() * listing.getPrice().getMonthlyrent();
        int totalMoveinCost = listing.getPrice().getMonthlyrent() +
                listing.getPrice().getSecuritydeposit() +
                listing.getPrice().getAppfee() +
                listing.getPrice().getPetfee() +
                advanceRentCost;

        return PricingDetails.builder()
                .monthlyrent(listing.getPrice().getMonthlyrent())
                .securitydeposit(listing.getPrice().getSecuritydeposit())
                .appfee(listing.getPrice().getAppfee() > 0 ? listing.getPrice().getAppfee() : null)
                .petfee(listing.getPrice().getPetfee() > 0 ? listing.getPrice().getPetfee() : null)
                .advancerent(listing.getPrice().getAdvancerent() > 0 ? listing.getPrice().getAdvancerent() : null)
                .advancerentcost(listing.getPrice().getAdvancerent() > 0 ? advanceRentCost : null)
                .totalmoveincost(totalMoveinCost)
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
        List<Review> reviews = listing.getReviews();

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

        
                
                
                