package com.abemivi.arinda.arindabackend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Data;

@Data
@Embeddable
public class Location {
    private String unit;
    private String building;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    private String city;

    @Column(nullable = false)
    private String barangay;

    @Column(nullable = false)
    private String postcode;

    @Column(nullable = false)
    private String province;

    // For mapbox API; not sure if it can be implemented on time
    private Double latitude;
    private Double longitude;

    @Column(length = 500)
    private String formataddress;

    private String placeName;
}
