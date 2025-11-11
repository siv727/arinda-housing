package com.abemivi.arinda.arindabackend.entity;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import java.util.Collection;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@DiscriminatorValue("STUDENT")
public class Student extends User {
    private String school;
    private String studentid;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // This defines the "role" for this user.
        return List.of(new SimpleGrantedAuthority("ROLE_STUDENT"));
    }

    // --- Relationships ---
    @OneToMany(mappedBy = "student")
    private List<Application> applications;

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL)
    private List<Review> reviews;
}
