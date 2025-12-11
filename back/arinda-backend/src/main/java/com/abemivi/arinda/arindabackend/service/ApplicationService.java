package com.abemivi.arinda.arindabackend.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.abemivi.arinda.arindabackend.dto.application.ApplicationResponse;
import com.abemivi.arinda.arindabackend.dto.application.ApproveApplicationRequest;
import com.abemivi.arinda.arindabackend.dto.application.BookingResponse;
import com.abemivi.arinda.arindabackend.dto.application.BookingSummary;
import com.abemivi.arinda.arindabackend.dto.application.CreateApplicationRequest;
import com.abemivi.arinda.arindabackend.dto.application.RejectApplicationRequest;
import com.abemivi.arinda.arindabackend.entity.Application;
import com.abemivi.arinda.arindabackend.entity.Landlord;
import com.abemivi.arinda.arindabackend.entity.Listing;
import com.abemivi.arinda.arindabackend.entity.Student;
import com.abemivi.arinda.arindabackend.entity.User;
import com.abemivi.arinda.arindabackend.entity.enums.ApplicationStatus;
import com.abemivi.arinda.arindabackend.repository.ApplicationRepository;
import com.abemivi.arinda.arindabackend.repository.ListingRepository;
import com.abemivi.arinda.arindabackend.repository.UserRepository;

import lombok.RequiredArgsConstructor;

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
        application.setPhoneNumber(request.phoneNumber());

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
                .responseMessage(application.getResponseMessage())
                .attachmentUrl(application.getAttachmentUrl())
                .tenantId(student.getId())
                .tenantName(tenantName)
                .tenantEmail(student.getEmail())
                .build();
    }

    // ===== LANDLORD BOOKINGS MANAGEMENT =====

    @Transactional(readOnly = true)
    public List<BookingSummary> getLandlordBookings(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!(user instanceof Landlord landlord)) {
            throw new RuntimeException("Only landlords can view bookings");
        }

        // Get all applications for landlord's listings
        List<Application> applications = applicationRepository.findByListingLandlord(landlord);

        return applications.stream()
                .map(this::buildBookingSummary)
                .toList();
    }

    @Transactional(readOnly = true)
    public BookingResponse getBookingDetails(String email, Long applicationId) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!(user instanceof Landlord landlord)) {
            throw new RuntimeException("Only landlords can view booking details");
        }

        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found"));

        // Verify landlord owns this listing
        if (!application.getListing().getLandlord().getId().equals(landlord.getId())) {
            throw new RuntimeException("You don't have permission to view this booking");
        }

        return buildBookingResponse(application);
    }

    @Transactional
    public BookingResponse approveApplication(String email, Long applicationId, ApproveApplicationRequest request) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!(user instanceof Landlord landlord)) {
            throw new RuntimeException("Only landlords can approve applications");
        }

        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found"));

        // Verify landlord owns this listing
        if (!application.getListing().getLandlord().getId().equals(landlord.getId())) {
            throw new RuntimeException("You don't have permission to approve this application");
        }

        // Update application status
        application.setStatus(ApplicationStatus.APPROVED);
        application.setResponseMessage(request.message());
        application.setAttachmentUrl(request.attachmentUrl());

        Application updated = applicationRepository.save(application);
        return buildBookingResponse(updated);
    }

    @Transactional
    public BookingResponse rejectApplication(String email, Long applicationId, RejectApplicationRequest request) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!(user instanceof Landlord landlord)) {
            throw new RuntimeException("Only landlords can reject applications");
        }

        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found"));

        // Verify landlord owns this listing
        if (!application.getListing().getLandlord().getId().equals(landlord.getId())) {
            throw new RuntimeException("You don't have permission to reject this application");
        }

        // Update application status
        application.setStatus(ApplicationStatus.REJECTED);
        application.setResponseMessage(request.message());

        Application updated = applicationRepository.save(application);
        return buildBookingResponse(updated);
    }

    private BookingResponse buildBookingResponse(Application application) {
        Student student = application.getStudent();
        Listing listing = application.getListing();
        
        String tenantName = student.getFirstname() + " " + student.getLastname();
        String listingAddress = listing.getLocation().getAddress() + ", " + listing.getLocation().getCity();
        
        BookingResponse.TenantInfo tenantInfo = BookingResponse.TenantInfo.builder()
                .id(student.getId())
                .name(tenantName)
                .email(student.getEmail())
                .studentId(student.getStudentid())
                .university(student.getSchool())
                .build();
        
        BookingResponse.PropertyInfo propertyInfo = BookingResponse.PropertyInfo.builder()
                .id(listing.getId())
                .title(listing.getTitle())
                .address(listingAddress)
                .build();
        
        return BookingResponse.builder()
                .id(application.getId())
                .tenant(tenantInfo)
                .property(propertyInfo)
                .moveInDate(application.getMoveInDate())
                .status(application.getStatus())
                .bookedDate(application.getCreatedAt())
                .phoneNumber(application.getPhoneNumber())
                .applicantMessage(application.getApplicantMessage())
                .responseMessage(application.getResponseMessage())
                .attachmentUrl(application.getAttachmentUrl())
                .build();
    }

    private BookingSummary buildBookingSummary(Application application) {
        Student student = application.getStudent();
        Listing listing = application.getListing();
        
        String tenantName = student.getFirstname() + " " + student.getLastname();
        String listingAddress = listing.getLocation().getAddress() + ", " + listing.getLocation().getCity();
        
        return BookingSummary.builder()
                .id(application.getId())
                .tenantName(tenantName)
                .tenantEmail(student.getEmail())
                .propertyTitle(listing.getTitle())
                .propertyAddress(listingAddress)
                .moveInDate(application.getMoveInDate())
                .status(application.getStatus())
                .bookedDate(application.getCreatedAt())
                .build();
    }
}
