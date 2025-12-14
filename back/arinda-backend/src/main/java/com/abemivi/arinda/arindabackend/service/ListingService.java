package com.abemivi.arinda.arindabackend.service;

import com.abemivi.arinda.arindabackend.dto.listing.CreateListingRequest;
import com.abemivi.arinda.arindabackend.dto.listingcards.LandlordListingCard;
import com.abemivi.arinda.arindabackend.dto.listingcards.TenantListingCard;
import com.abemivi.arinda.arindabackend.dto.listingdetails.LandlordListingDetails;
import com.abemivi.arinda.arindabackend.dto.listingdetails.TenantListingDetails;
import com.abemivi.arinda.arindabackend.entity.*;
import com.abemivi.arinda.arindabackend.entity.enums.ListingStatus;
import com.abemivi.arinda.arindabackend.mapper.ListingMapper;
import com.abemivi.arinda.arindabackend.repository.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ListingService {

    private final ListingRepository listingRepository;
    // Removed AmenityRepository, NeedsIncludedRepository, EstablishmentRepository
    private final UserRepository userRepository;
    private final ListingMapper listingMapper;

    @Transactional
    public Listing createListing(CreateListingRequest request, Long landlordId) {
        Landlord landlord = (Landlord) userRepository.findById(landlordId)
                .orElseThrow(() -> new RuntimeException("Landlord not found"));

        Listing listing = new Listing();
        listing.setTitle(request.getTitle());
        listing.setDescription(request.getDescription());
        listing.setPropertytype(request.getPropertytype());
        listing.setRoomtype(request.getRoomtype());
        listing.setListingstatus(ListingStatus.AVAILABLE);
        listing.setLandlord(landlord);

        // Set Location
        Location location = new Location();
        location.setUnit(request.getUnit());
        location.setBuilding(request.getBuilding());
        location.setAddress(request.getAddress());
        location.setBarangay(request.getBarangay());
        location.setCity(request.getCity());
        location.setPostcode(request.getPostcode());
        location.setProvince(request.getProvince());
        location.setFormataddress(request.getFormataddress());
        location.setPlaceName(request.getPlacename());
        listing.setLocation(location);

        // Set Price
        Price price = new Price();
        price.setMonthlyrent(request.getMonthlyrent());
        price.setSecuritydeposit(request.getSecuritydeposit());
        price.setAppfee(request.getAppfee() != null ? request.getAppfee() : 0);
        price.setPetfee(request.getPetfee() != null ? request.getPetfee() : 0);
        price.setAdvancerent(request.getAdvancerent() != null ? request.getAdvancerent() : 1);
        listing.setPrice(price);

        listing = listingRepository.save(listing);

        if (request.getLeaseterms() != null && !request.getLeaseterms().isEmpty()) {
            for (Integer months : request.getLeaseterms()) {
                LeaseTerm leaseTerm = new LeaseTerm();
                leaseTerm.setMonths(months);
                leaseTerm.setListing(listing);
                listing.getLeaseterms().add(leaseTerm);
            }
        }

        if (request.getPhotourls() != null && !request.getPhotourls().isEmpty()) {
            for (String url : request.getPhotourls()) {
                Photo photo = new Photo();
                photo.setUrl(url);
                photo.setListing(listing);
                listing.getPhotos().add(photo);
            }
        }

        // REFACTORED: Directly set the sets of strings
        if (request.getInclusions() != null) {
            listing.setInclusions(request.getInclusions());
        }

        if (request.getAmenities() != null) {
            listing.setAmenities(request.getAmenities());
        }

        if (request.getEstablishments() != null) {
            listing.setEstablishments(request.getEstablishments());
        }

        return listingRepository.save(listing);
    }

    @Transactional
    public Listing updateListing(Long listingId, CreateListingRequest request, Long landlordId) {
        Listing listing = listingRepository.findById(listingId)
                .orElseThrow(() -> new RuntimeException("Listing not found"));

        if (!listing.getLandlord().getId().equals(landlordId)) {
            throw new RuntimeException("Unauthorized to update this listing");
        }

        listing.setTitle(request.getTitle());
        listing.setDescription(request.getDescription());
        listing.setPropertytype(request.getPropertytype());
        listing.setRoomtype(request.getRoomtype());

        // Update Location
        Location location = listing.getLocation();
        if (location == null) location = new Location();
        location.setUnit(request.getUnit());
        location.setBuilding(request.getBuilding());
        location.setAddress(request.getAddress());
        location.setBarangay(request.getBarangay());
        location.setCity(request.getCity());
        location.setPostcode(request.getPostcode());
        location.setProvince(request.getProvince());
        location.setFormataddress(request.getFormataddress());
        location.setPlaceName(request.getPlacename());
        listing.setLocation(location);

        // Update Price
        Price price = listing.getPrice();
        if (price == null) price = new Price();
        price.setMonthlyrent(request.getMonthlyrent());
        price.setSecuritydeposit(request.getSecuritydeposit());
        price.setAppfee(request.getAppfee() != null ? request.getAppfee() : 0);
        price.setPetfee(request.getPetfee() != null ? request.getPetfee() : 0);
        price.setAdvancerent(request.getAdvancerent());
        listing.setPrice(price);

        // Update Leaseterms
        if (request.getLeaseterms() != null) {
            listing.getLeaseterms().clear();
            for (Integer months : request.getLeaseterms()) {
                LeaseTerm leaseTerm = new LeaseTerm();
                leaseTerm.setMonths(months);
                leaseTerm.setListing(listing);
                listing.getLeaseterms().add(leaseTerm);
            }
        }

        // Update Photos
        if (request.getPhotourls() != null) {
            listing.getPhotos().clear();
            for (String url : request.getPhotourls()) {
                Photo photo = new Photo();
                photo.setUrl(url);
                photo.setListing(listing);
                listing.getPhotos().add(photo);
            }
        }

        // REFACTORED: Direct assignment for collections
        if (request.getInclusions() != null) {
            listing.setInclusions(new HashSet<>(request.getInclusions()));
        }

        if (request.getAmenities() != null) {
            listing.setAmenities(new HashSet<>(request.getAmenities()));
        }

        if (request.getEstablishments() != null) {
            listing.setEstablishments(new HashSet<>(request.getEstablishments()));
        }

        return listingRepository.save(listing);
    }

    // ... keep getLandlordListings, getLandlordListingDetails, etc. as they are
    public List<LandlordListingCard> getLandlordListings(Long landlordId) {
        List<Listing> listings = listingRepository.findAllByLandlordIdWithPhotos(landlordId);
        return listings.stream()
                .map(listingMapper::toLandlordCardDTO)
                .collect(Collectors.toList());
    }

    public LandlordListingDetails getLandlordListingDetails(Long listingId, Long landlordId) {
        Listing listing = listingRepository.findById(listingId)
                .orElseThrow(() -> new RuntimeException("Listing not found with ID: " + listingId));

        if (!listing.getLandlord().getId().equals(landlordId)) {
            throw new RuntimeException("Unauthorized: This listing belongs to another landlord");
        }

        return listingMapper.toLandlordDetailsDTO(listing);
    }

    @Transactional
    public void deleteListing(Long listingId, Long landlordId) {
        Listing listing = listingRepository.findById(listingId)
                .orElseThrow(() -> new RuntimeException("Listing not found"));

        if (!listing.getLandlord().getId().equals(landlordId)) {
            throw new RuntimeException("Unauthorized to delete this listing");
        }

        listingRepository.delete(listing);
    }

    @Transactional
    public void updateListingStatus(Long listingId, Long landlordId, ListingStatus status) {
        Listing listing = listingRepository.findById(listingId)
                .orElseThrow(() -> new RuntimeException("Listing not found"));

        if (!listing.getLandlord().getId().equals(landlordId)) {
            throw new RuntimeException("Unauthorized to update this listing");
        }

        listing.setListingstatus(status);
        listingRepository.save(listing);
    }

    // TENANT OPERATIONS
    public List<TenantListingCard> getAllListings() {
        // Fetch only AVAILABLE listings
        List<Listing> listings = listingRepository.findAllAvailableWithPhotosAndAmenities(ListingStatus.AVAILABLE);

        return listings.stream()
                .map(listingMapper::toTenantCardDTO)
                .collect(Collectors.toList());
    }

    public TenantListingDetails getListingDetails(Long id) {
        Listing listing = listingRepository.findByIdWithAllDetails(id)
                .orElseThrow(() -> new RuntimeException("Listing not found"));

        // Optional: Check if listing is actually available before showing it?
        // For now, we allow viewing it, but the frontend might want to hide the "Book" button if it's not AVAILABLE.

        return listingMapper.toTenantDetailsDTO(listing);
    }
}