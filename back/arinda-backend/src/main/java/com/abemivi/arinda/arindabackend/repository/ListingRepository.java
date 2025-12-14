package com.abemivi.arinda.arindabackend.repository;

import com.abemivi.arinda.arindabackend.entity.Listing;
import com.abemivi.arinda.arindabackend.entity.enums.ListingStatus;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ListingRepository extends JpaRepository<Listing, Long> {
        // LANDLORD OPERATIONS
        // For Listing Management View
        @Query("""
                SELECT DISTINCT l FROM Listing l
                LEFT JOIN FETCH l.photos
                WHERE l.landlord.id = :landlordId
                ORDER BY l.createdat DESC
            """)
        List<Listing> findAllByLandlordIdWithPhotos(@Param("landlordId") Long landlordId);

        // For Detailed Listing Management View
        @Query("""
                    SELECT DISTINCT l FROM Listing l
                    LEFT JOIN FETCH l.photos
                    LEFT JOIN FETCH l.leaseterms
                    LEFT JOIN FETCH l.amenities
                    LEFT JOIN FETCH l.inclusions
                    LEFT JOIN FETCH l.establishments
                    LEFT JOIN FETCH l.reviews r
                    LEFT JOIN FETCH r.student
                    WHERE l.id = :id
                    AND l.landlord.id = :landlordId
                """)
        Optional<Listing> findByIdAndLandlordIdWithReviews(
                @Param("id") Long id,
                @Param("landlordId") Long landlordId);

        // Filter by status
        @Query("""
                SELECT DISTINCT l FROM Listing l
                LEFT JOIN FETCH l.photos
                WHERE l.landlord.id = :landlordId
                AND l.listingstatus = :status
                ORDER BY l.createdat DESC
            """)
        List<Listing> findAllByLandlordIdAndStatusWithPhotos(
                @Param("landlordId") Long landlordId,
                @Param("status") ListingStatus status);

        // Count listings by landlord and status (for dashboard stats)
        long countByLandlordIdAndListingstatus(Long landlordId, ListingStatus status);

        // Count all listings by landlord
        long countByLandlordId(Long landlordId);

        @EntityGraph(attributePaths = "photos")
        List<Listing> findTop3ByLandlordIdOrderByCreatedatDesc(Long landlordId);

        // TENANT OPERATIONS
        // Display all listings
        @Query("""
                SELECT DISTINCT l FROM Listing l
                LEFT JOIN FETCH l.photos
                LEFT JOIN FETCH l.amenities
                WHERE l.listingstatus = :status
                ORDER BY l.createdat DESC
            """)
        List<Listing> findAllAvailableWithPhotosAndAmenities(@Param("status") ListingStatus status);

        // Display detailed listing view for a specific listing
        @Query("""
                SELECT DISTINCT l FROM Listing l
                LEFT JOIN FETCH l.landlord
                LEFT JOIN FETCH l.photos
                LEFT JOIN FETCH l.leaseterms
                LEFT JOIN FETCH l.amenities
                LEFT JOIN FETCH l.inclusions
                LEFT JOIN FETCH l.establishments
                LEFT JOIN FETCH l.reviews r
                LEFT JOIN FETCH r.student
                WHERE l.id = :id
            """)
        Optional<Listing> findByIdWithAllDetails(@Param("id") Long id);

        // Find by specific price ranges
        @Query("""
                SELECT DISTINCT l FROM Listing l
                WHERE l.listingstatus = :status
                AND l.price.monthlyrent BETWEEN :minPrice AND :maxPrice
            """)
        List<Listing> findByPriceRange(
                @Param("status") ListingStatus status,
                @Param("minPrice") int minPrice,
                @Param("maxPrice") int maxPrice);

        // Find by amenities
        @Query("""
                SELECT DISTINCT l FROM Listing l
                JOIN l.amenities a
                WHERE a IN :amenities
                AND l.listingstatus = :status
                GROUP BY l.id
                HAVING COUNT(DISTINCT a) = :amenityCount
            """)
        List<Listing> findByAmenities(
                @Param("status") ListingStatus status,
                @Param("amenities") List<String> amenities,
                @Param("amenityCount") long amenityCount);

        // Sort for a specific property type
        List<Listing> findByRoomtypeAndListingstatus(String roomtype, ListingStatus status);

        // Sort for a specific property type
        List<Listing> findByPropertytypeAndListingstatus(String propertytype, ListingStatus status);
}