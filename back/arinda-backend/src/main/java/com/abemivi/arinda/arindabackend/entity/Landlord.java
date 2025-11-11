package com.abemivi.arinda.arindabackend.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Collection;
import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@DiscriminatorValue("LANDLORD")
public class Landlord extends User {

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // This defines the "role" for this user.
        return List.of(new SimpleGrantedAuthority("ROLE_LANDLORD"));
    }

    // --- Relationships ---

    @OneToMany(mappedBy = "landlord")
    private List<Listing> listings;
}
