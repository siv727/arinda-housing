package com.abemivi.arinda.arindabackend.entity;

import com.abemivi.arinda.arindabackend.entity.enums.Role;
import jakarta.persistence.*;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

@Data
@Entity
@Table(name = "users")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(
        name = "role",
        discriminatorType = DiscriminatorType.STRING
)
public abstract class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String passwordhash;

    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false, updatable = false, insertable = false)
    private Role role;

    @Column(nullable = false)
    private String firstname;

    @Column(nullable = false)
    private String lastname;

    // UserDetails Override
    @Override
    public abstract Collection<? extends GrantedAuthority> getAuthorities();

    @Override
    public String getPassword() {
        return passwordhash;
    }

    @Override
    public String getUsername() {
        return email;
    }

    // check for subscription; true for now since no subscription model
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    // check for too many failed logins;
    // will add attempts and lockout for a certain amount of time
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    // check for password change number of days ago
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    // check for email verification; no implementation yet
    @Override
    public boolean isEnabled() {
        return true;
    }
}
