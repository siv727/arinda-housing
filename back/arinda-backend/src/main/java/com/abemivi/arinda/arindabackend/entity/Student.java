package com.abemivi.arinda.arindabackend.entity;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "students")
@DiscriminatorValue("ROLE_STUDENT")

public class Student extends User {
    // The 'id' is inherited from User

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    // --- Relationships ---
    @OneToMany(mappedBy = "student")
    private List<Application> applications;

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL)
    private List<Review> reviews;

    @OneToOne(mappedBy = "student", cascade = CascadeType.ALL) // Assuming Lease links to Student
    private Lease lease;
}
