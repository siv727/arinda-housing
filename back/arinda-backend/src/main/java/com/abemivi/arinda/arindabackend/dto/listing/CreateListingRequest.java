package com.abemivi.arinda.arindabackend.dto.listing;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.Set;

@Data
@Builder
public class CreateListingRequest {

    // Basic Info
    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Description is required")
    private String description;

    // Property Type & Room Type
    @NotBlank(message = "Property type is required")
    private String propertytype;

    @NotBlank(message = "Room type is required")
    private String roomtype;

    // Location
    private String unit;
    private String building;

    @NotBlank(message = "Address is required")
    private String address;

    @NotBlank(message = "Barangay is required")
    private String barangay;

    @NotBlank(message = "City is required")
    private String city;

    @NotBlank(message = "Postcode is required")
    private String postcode;

    @NotBlank(message = "Province is required")
    private String province;

    private String formataddress;
    private String placename;

    // Pricing
    @NotNull(message = "Monthly rent is required")
    @Positive(message = "Monthly rent must be positive")
    private Integer monthlyrent;

    @NotNull(message = "Security deposit is required")
    @Positive(message = "Security deposit must be positive")
    private Integer securitydeposit;

    private Integer appfee;
    private Integer petfee;
    private Integer advancerent; // number of months

    // Lease Terms
    private Set<Integer> leaseterms; // Available lease terms (1, 3, 6, 12, 24 months)

    // What's Included (utilities)
    private Set<String> inclusions; // Wi-Fi, Water, Electricity, Gas, Cable TV, Trash Collection

    // Photos
    @NotNull(message = "At least one photo is required")
    private List<String> photourls;

    // Amenities
    private Set<String> amenities;

    // Neighborhood (Establishments)
    private Set<String> establishments;
}
