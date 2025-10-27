package com.abemivi.arinda.arindabackend.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "landlords")
@DiscriminatorValue("ROLE_LANDLORD")
public class Landlord extends User {
    // The 'id' is inherited from User

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    private String contactPhone;

    @Lob // For longer text
    private String profileInfo;

    // --- Relationships ---

    @OneToMany(mappedBy = "landlord")
    private List<Listing> listings;
}
