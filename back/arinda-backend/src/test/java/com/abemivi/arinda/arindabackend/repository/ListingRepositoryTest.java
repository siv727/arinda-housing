package com.abemivi.arinda.arindabackend.repository;

import com.abemivi.arinda.arindabackend.entity.*;
import com.abemivi.arinda.arindabackend.entity.enums.ListingStatus;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class ListingRepositoryTest {

    @Autowired
    private ListingRepository listingRepository;

    @Autowired
    private TestEntityManager entityManager;

    @Test
    void findByIdWithAllDetails_ShouldFetchAllRelationships() {
        // --- 1. SETUP: Create and Persist Data ---

        // A. Create Landlord (Required for Listing)
        Landlord landlord = new Landlord();
        landlord.setFirstname("Juan");
        landlord.setLastname("Dela Cruz");
        landlord.setEmail("juan@test.com");
        landlord.setPasswordhash("password123");
        landlord.setPhonenumber("09170000000");
        entityManager.persist(landlord);

        // B. Create Listing
        Listing listing = new Listing();
        listing.setTitle("Test Unit near USC");
        listing.setDescription("Cozy place");
        listing.setPropertytype("Apartment");
        listing.setRoomtype("Studio");
        listing.setListingstatus(ListingStatus.AVAILABLE);
        listing.setLandlord(landlord);

        // C. Set Embedded Fields (Location & Price)
        Location location = new Location();
        location.setCity("Cebu City");
        location.setAddress("Talamban");
        location.setBarangay("Talamban");
        location.setProvince("Cebu");

        // --- ADD THESE TO FIX THE ERROR ---
        location.setPostcode("6000");       // Fixes the current error
        location.setLatitude(10.3);         // Likely required
        location.setLongitude(123.9);       // Likely required
        location.setFormataddress("Talamban, Cebu City, 6000"); // Likely required
        location.setPlaceName("Test Apartment"); // Likely required

        listing.setLocation(location);

        Price price = new Price();
        price.setMonthlyrent(15000);
        price.setSecuritydeposit(15000);
        listing.setPrice(price);

        // D. Add Collections (The items we want to test JOIN FETCH for)
        listing.setAmenities(new HashSet<>(Set.of("WiFi", "Aircon")));
        listing.setInclusions(new HashSet<>(Set.of("Water")));

        // E. Add Child Entities
        LeaseTerm term = new LeaseTerm();
        term.setMonths(6);
        term.setListing(listing);
        listing.getLeaseterms().add(term);

        Photo photo = new Photo();
        photo.setUrl("http://cloudinary.com/test.jpg");
        photo.setListing(listing);
        listing.getPhotos().add(photo);

        // F. Save to DB
        Listing savedListing = entityManager.persist(listing);

        // --- CRITICAL STEP: FLUSH & CLEAR ---
        // Force Hibernate to write to the DB and clear the cache.
        // This ensures the repository actually runs the SQL SELECT query
        // instead of just returning the object from memory.
        entityManager.flush();
        entityManager.clear();

        // --- 2. ACT: Run the Repository Query ---
        Optional<Listing> result = listingRepository.findByIdWithAllDetails(savedListing.getId());

        // --- 3. ASSERT: Verify Data ---
        assertThat(result).isPresent();
        Listing fetched = result.get();

        System.out.println("Fetched Title: " + fetched.getTitle());
        System.out.println("Fetched Host: " + fetched.getLandlord().getFirstname());

        // Verify Host (Landlord) was fetched
        assertThat(fetched.getLandlord()).isNotNull();
        assertThat(fetched.getLandlord().getFirstname()).isEqualTo("Juan");

        // Verify Collections were fetched
        assertThat(fetched.getAmenities()).hasSize(2).contains("WiFi");
        assertThat(fetched.getLeaseterms()).hasSize(1);
        assertThat(fetched.getPhotos()).hasSize(1);
        assertThat(fetched.getPhotos().iterator().next().getUrl()).isEqualTo("http://cloudinary.com/test.jpg");
    }
}