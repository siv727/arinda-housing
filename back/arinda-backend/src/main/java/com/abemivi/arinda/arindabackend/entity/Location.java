package com.abemivi.arinda.arindabackend.entity;

import jakarta.persistence.Embeddable;
import lombok.Data;

@Data
@Embeddable
public class Location {
    private String address;
    private double latitude;
    private double longitude;
    private String city;
    private String barangay;
    private String postcode;
}
