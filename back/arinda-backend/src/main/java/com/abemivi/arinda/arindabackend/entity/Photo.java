package com.abemivi.arinda.arindabackend.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@Entity
@NoArgsConstructor
@Table(name = "photo")
@EqualsAndHashCode(exclude = "listing")
@ToString(exclude = "listing")
public class Photo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String url;

    @ManyToOne
    @JoinColumn(name = "listing_id", nullable = false)
    private Listing listing;
}
