package com.abemivi.arinda.arindabackend.service;

import com.abemivi.arinda.arindabackend.dto.listing.CreateListingRequest;
import com.abemivi.arinda.arindabackend.dto.listingcards.LandlordListingCard;
import com.abemivi.arinda.arindabackend.dto.listingdetails.LandlordListingDetails;
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
    private final AmenityRepository amenityRepository;
    private final NeedsIncludedRepository needsIncludedRepository;
    private final EstablishmentRepository establishmentRepository;
    private final UserRepository userRepository;
    private final ListingMapper listingMapper;

    @Transactional
    public Listing createListing(CreateListingRequest request, Long landlordId) {
        // Get landlord
        Landlord landlord = (Landlord) userRepository.findById(landlordId)
                .orElseThrow(() -> new RuntimeException("Landlord not found"));

        // Create listing
        Listing listing = new Listing();
        listing.setTitle(request.getTitle());
        listing.setDescription(request.getDescription());
        listing.setPropertytype(request.getPropertytype());
        listing.setRoomtype(request.getRoomtype());
        listing.setListingstatus(ListingStatus.AVAILABLE);
        listing.setLandlord(landlord);

        // Set location
        Location location = new Location();
        location.setUnit(request.getUnit());
        location.setBuilding(request.getBuilding());
        location.setAddress(request.getAddress());
        location.setBarangay(request.getBarangay());
        location.setCity(request.getCity());
        location.setPostcode(request.getPostcode());
        location.setProvince(request.getProvince());
        location.setLatitude(request.getLatitude());
        location.setLongitude(request.getLongitude());
        location.setFormataddress(request.getFormataddress());
        location.setPlaceName(request.getPlacename());
        listing.setLocation(location);

        // Set price
        Price price = new Price();
        price.setMonthlyrent(request.getMonthlyrent());
        price.setSecuritydeposit(request.getSecuritydeposit());
        price.setAppfee(request.getAppfee() != null ? request.getAppfee() : 0);
        price.setPetfee(request.getPetfee() != null ? request.getPetfee() : 0);
        price.setAdvancerent(request.getAdvancerent() != null ? request.getAdvancerent() : 1);
        listing.setPrice(price);

        // Save listing first to get ID (needed for lease terms foreign key)
        listing = listingRepository.save(listing);

        // Create and add lease terms
        if (request.getLeaseterms() != null && !request.getLeaseterms().isEmpty()) {
            for (Integer months : request.getLeaseterms()) {
                LeaseTerm leaseTerm = new LeaseTerm();
                leaseTerm.setMonths(months);
                leaseTerm.setListing(listing);
                listing.getLeaseterms().add(leaseTerm);
            }
        }

        // Add photos
        if (request.getPhotourls() != null && !request.getPhotourls().isEmpty()) {
            for (String url : request.getPhotourls()) {
                Photo photo = new Photo();
                photo.setUrl(url);
                photo.setListing(listing);
                listing.getPhotos().add(photo);
            }
        }

        // Add inclusions
        if (request.getInclusions() != null && !request.getInclusions().isEmpty()) {
            Set<NeedsIncluded> inclusions = getOrCreateInclusions(request.getInclusions());
            listing.setInclusions(inclusions);
        }

        // Add amenities
        if (request.getAmenities() != null && !request.getAmenities().isEmpty()) {
            Set<Amenity> amenities = getOrCreateAmenities(request.getAmenities());
            listing.setAmenities(amenities);
        }

        // Add establishments
        if (request.getEstablishments() != null && !request.getEstablishments().isEmpty()) {
            Set<Establishment> establishments = getOrCreateEstablishments(request.getEstablishments());
            listing.setEstablishments(establishments);
        }

        return listingRepository.save(listing);
    }

    @Transactional
    public Listing updateListing(Long listingId, CreateListingRequest request, Long landlordId) {
        Listing listing = listingRepository.findById(listingId)
                .orElseThrow(() -> new RuntimeException("Listing not found"));

        // Verify ownership
        if (!listing.getLandlord().getId().equals(landlordId)) {
            throw new RuntimeException("Unauthorized to update this listing");
        }

        // Update basic info
        listing.setTitle(request.getTitle());
        listing.setDescription(request.getDescription());
        listing.setPropertytype(request.getPropertytype());
        listing.setRoomtype(request.getRoomtype());

        // Update location
        Location location = listing.getLocation();
        if (location == null) {
            location = new Location();
        }
        location.setUnit(request.getUnit());
        location.setBuilding(request.getBuilding());
        location.setAddress(request.getAddress());
        location.setBarangay(request.getBarangay());
        location.setCity(request.getCity());
        location.setPostcode(request.getPostcode());
        location.setProvince(request.getProvince());
        location.setLatitude(request.getLatitude());
        location.setLongitude(request.getLongitude());
        location.setFormataddress(request.getFormataddress());
        location.setPlaceName(request.getPlacename());
        listing.setLocation(location);

        // Update price
        Price price = listing.getPrice();
        if (price == null) {
            price = new Price();
        }
        price.setMonthlyrent(request.getMonthlyrent());
        price.setSecuritydeposit(request.getSecuritydeposit());
        price.setAppfee(request.getAppfee() != null ? request.getAppfee() : 0);
        price.setPetfee(request.getPetfee() != null ? request.getPetfee() : 0);
        price.setAdvancerent(request.getAdvancerent());
        listing.setPrice(price);

        // Update lease terms
        if (request.getLeaseterms() != null) {
            listing.getLeaseterms().clear();
            for (Integer months : request.getLeaseterms()) {
                LeaseTerm leaseTerm = new LeaseTerm();
                leaseTerm.setMonths(months);
                leaseTerm.setListing(listing);
                listing.getLeaseterms().add(leaseTerm);
            }
        }

        // Update photos
        if (request.getPhotourls() != null) {
            listing.getPhotos().clear();
            for (String url : request.getPhotourls()) {
                Photo photo = new Photo();
                photo.setUrl(url);
                photo.setListing(listing);
                listing.getPhotos().add(photo);
            }
        }

        // Update inclusions
        if (request.getInclusions() != null) {
            Set<NeedsIncluded> inclusions = getOrCreateInclusions(request.getInclusions());
            listing.setInclusions(inclusions);
        }

        // Update amenities
        if (request.getAmenities() != null) {
            Set<Amenity> amenities = getOrCreateAmenities(request.getAmenities());
            listing.setAmenities(amenities);
        }

        // Update establishments
        if (request.getEstablishments() != null) {
            Set<Establishment> establishments = getOrCreateEstablishments(request.getEstablishments());
            listing.setEstablishments(establishments);
        }

        return listingRepository.save(listing);
    }

    public List<LandlordListingCard> getLandlordListings(Long landlordId) {
        List<Listing> listings = listingRepository.findAllByLandlordIdWithPhotos(landlordId);
        return listings.stream()
                .map(listingMapper::toLandlordCardDTO)
                .collect(Collectors.toList());
    }

    public LandlordListingDetails getLandlordListingDetails(Long listingId, Long landlordId) {
        // First check if listing exists at all
        Listing listing = listingRepository.findById(listingId)
                .orElseThrow(() -> new RuntimeException("Listing not found with ID: " + listingId));

        // Then check ownership
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

    // Helper methods to get or create reference data
    private Set<Amenity> getOrCreateAmenities(Set<String> amenityNames) {
        Set<Amenity> amenities = new HashSet<>();
        for (String name : amenityNames) {
            Amenity amenity = amenityRepository.findByName(name)
                    .orElseGet(() -> {
                        Amenity newAmenity = new Amenity();
                        newAmenity.setName(name);
                        return amenityRepository.save(newAmenity);
                    });
            amenities.add(amenity);
        }
        return amenities;
    }

    private Set<NeedsIncluded> getOrCreateInclusions(Set<String> inclusionNames) {
        Set<NeedsIncluded> inclusions = new HashSet<>();
        for (String name : inclusionNames) {
            NeedsIncluded inclusion = needsIncludedRepository.findByName(name)
                    .orElseGet(() -> {
                        NeedsIncluded newInclusion = new NeedsIncluded();
                        newInclusion.setName(name);
                        return needsIncludedRepository.save(newInclusion);
                    });
            inclusions.add(inclusion);
        }
        return inclusions;
    }

    private Set<Establishment> getOrCreateEstablishments(Set<String> establishmentNames) {
        Set<Establishment> establishments = new HashSet<>();
        for (String name : establishmentNames) {
            Establishment establishment = establishmentRepository.findByName(name)
                    .orElseGet(() -> {
                        Establishment newEstablishment = new Establishment();
                        newEstablishment.setName(name);
                        return establishmentRepository.save(newEstablishment);
                    });
            establishments.add(establishment);
        }
        return establishments;
    }
}
