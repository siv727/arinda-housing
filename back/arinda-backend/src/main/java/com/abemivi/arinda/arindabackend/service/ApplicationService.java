package com.abemivi.arinda.arindabackend.service;

import com.abemivi.arinda.arindabackend.dto.application.ApplicationResponse;
import com.abemivi.arinda.arindabackend.dto.application.CreateApplicationRequest;
import com.abemivi.arinda.arindabackend.entity.Application;
import com.abemivi.arinda.arindabackend.entity.Listing;
import com.abemivi.arinda.arindabackend.entity.Student;
import com.abemivi.arinda.arindabackend.entity.User;
import com.abemivi.arinda.arindabackend.repository.ApplicationRepository;
import com.abemivi.arinda.arindabackend.repository.ListingRepository;
import com.abemivi.arinda.arindabackend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final UserRepository userRepository;
    private final ListingRepository listingRepository;

    @Transactional
    public ApplicationResponse createApplication(String email, CreateApplicationRequest request) {
        // Get authenticated student
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!(user instanceof Student student)) {
            throw new RuntimeException("Only students can submit applications");
        }

        // Validate listing exists
        Listing listing = listingRepository.findById(request.listingId())
                .orElseThrow(() -> new RuntimeException("Listing not found"));

        // Check if student already applied to this listing
        if (applicationRepository.existsByStudentAndListing(student, listing)) {
            throw new RuntimeException("You have already submitted an application for this listing");
        }

        // Create application
        Application application = new Application();
        application.setStudent(student);
        application.setListing(listing);
        application.setMoveInDate(request.moveInDate());
        application.setApplicantMessage(request.applicantMessage());

        Application savedApplication = applicationRepository.save(application);

        return buildApplicationResponse(savedApplication);
    }

    @Transactional(readOnly = true)
    public List<ApplicationResponse> getMyApplications(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!(user instanceof Student student)) {
            throw new RuntimeException("Only students can view applications");
        }

        List<Application> applications = applicationRepository.findByStudent(student);

        return applications.stream()
                .map(this::buildApplicationResponse)
                .toList();
    }

    private ApplicationResponse buildApplicationResponse(Application application) {
        Student student = application.getStudent();
        Listing listing = application.getListing();
        String tenantName = student.getFirstname() + " " + student.getLastname();
        String listingAddress = listing.getLocation().getAddress() + ", " + listing.getLocation().getCity();

        return ApplicationResponse.builder()
                .id(application.getId())
                .listingId(listing.getId())
                .listingTitle(listing.getTitle())
                .listingAddress(listingAddress)
                .moveInDate(application.getMoveInDate())
                .applicantMessage(application.getApplicantMessage())
                .status(application.getStatus())
                .createdAt(application.getCreatedAt())
                .tenantId(student.getId())
                .tenantName(tenantName)
                .tenantEmail(student.getEmail())
                .build();
    }
}
