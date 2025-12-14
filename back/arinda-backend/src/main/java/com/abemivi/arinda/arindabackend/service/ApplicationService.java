package com.abemivi.arinda.arindabackend.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.abemivi.arinda.arindabackend.dto.application.ApplicationEligibilityResponse;
import com.abemivi.arinda.arindabackend.dto.application.ApplicationResponse;
import com.abemivi.arinda.arindabackend.dto.application.ApproveApplicationRequest;
import com.abemivi.arinda.arindabackend.dto.application.BookingResponse;
import com.abemivi.arinda.arindabackend.dto.application.BookingSummary;
import com.abemivi.arinda.arindabackend.dto.application.CreateApplicationRequest;
import com.abemivi.arinda.arindabackend.dto.application.RejectApplicationRequest;
import com.abemivi.arinda.arindabackend.entity.Application;
import com.abemivi.arinda.arindabackend.entity.Landlord;
import com.abemivi.arinda.arindabackend.entity.Lease;
import com.abemivi.arinda.arindabackend.entity.Listing;
import com.abemivi.arinda.arindabackend.entity.Student;
import com.abemivi.arinda.arindabackend.entity.User;
import com.abemivi.arinda.arindabackend.entity.enums.ApplicationStatus;
import com.abemivi.arinda.arindabackend.entity.enums.LeaseStatus;
import com.abemivi.arinda.arindabackend.repository.ApplicationRepository;
import com.abemivi.arinda.arindabackend.repository.LeaseRepository;
import com.abemivi.arinda.arindabackend.repository.ListingRepository;
import com.abemivi.arinda.arindabackend.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final UserRepository userRepository;
    private final ListingRepository listingRepository;
    private final LeaseRepository leaseRepository;

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

        // Check eligibility using shared logic
        ApplicationEligibilityResponse eligibility = checkEligibilityInternal(student, listing);
        if (!eligibility.canApply()) {
            String message = switch (eligibility.reason()) {
                case "HAS_ACTIVE_LEASE" -> "You already have an active lease. You cannot apply to new listings until your current lease ends";
                case "PENDING" -> "You have already submitted a pending application for this listing";
                case "ACTIVE_LEASE" -> "You have an active lease for this property";
                case "COOLDOWN" -> "You must wait " + eligibility.hoursRemaining() + " more hour(s) before reapplying to this listing";
                default -> "You cannot apply to this listing at this time";
            };
            throw new RuntimeException(message);
        }

        // Create application
        Application application = new Application();
        application.setStudent(student);
        application.setListing(listing);
        application.setMoveInDate(request.moveInDate());
        application.setApplicantMessage(request.applicantMessage());
        application.setPhoneNumber(request.phoneNumber());
        application.setLeaseTerm(request.leaseTerm());

        Application savedApplication = applicationRepository.save(application);

        return buildApplicationResponse(savedApplication);
    }

    /**
     * Check if a student is eligible to apply to a listing.
     * Returns structured info for the frontend to display appropriate UI.
     */
    @Transactional(readOnly = true)
    public ApplicationEligibilityResponse checkEligibility(String email, Long listingId) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!(user instanceof Student student)) {
            throw new RuntimeException("Only students can check eligibility");
        }

        Listing listing = listingRepository.findById(listingId)
                .orElseThrow(() -> new RuntimeException("Listing not found"));

        return checkEligibilityInternal(student, listing);
    }

    /**
     * Internal helper for eligibility checking - used by both createApplication and checkEligibility.
     */
    private ApplicationEligibilityResponse checkEligibilityInternal(Student student, Listing listing) {
        // 1. Check for pending application on THIS listing (highest priority per-listing check)
        Optional<Application> pendingApp = applicationRepository.findPendingApplication(student, listing);
        if (pendingApp.isPresent()) {
            return ApplicationEligibilityResponse.builder()
                    .canApply(false)
                    .reason("PENDING")
                    .blockedUntil(null)
                    .hoursRemaining(null)
                    .build();
        }

        // 2. Check for approved application with active lease ON THIS LISTING (shows "Active Lease" - blue)
        // This must come BEFORE the global check so the correct listing shows "you live here"
        Optional<Application> activeLeaseOnThisListing = applicationRepository.findActiveApprovedApplicationWithLease(student, listing);
        if (activeLeaseOnThisListing.isPresent()) {
            Application approvedApp = activeLeaseOnThisListing.get();
            Lease lease = approvedApp.getLease();
            // Convert lease end date to LocalDateTime for consistency
            LocalDateTime leaseEndDateTime = lease.getEndDate().atStartOfDay();
            long hoursRemaining = java.time.Duration.between(LocalDateTime.now(), leaseEndDateTime).toHours();
            
            return ApplicationEligibilityResponse.builder()
                    .canApply(false)
                    .reason("ACTIVE_LEASE")
                    .blockedUntil(leaseEndDateTime)
                    .hoursRemaining(Math.max(0, hoursRemaining))
                    .build();
        }

        // 3. GLOBAL CHECK: Check if student has an active lease on ANY OTHER property
        // This prevents tenants from applying to new listings while they have an active lease elsewhere
        Optional<Lease> anyActiveLease = leaseRepository.findByStudentIdAndLeaseStatus(
                student.getId(), 
                LeaseStatus.ACTIVE
        );
        
        if (anyActiveLease.isPresent()) {
            Lease activeLease = anyActiveLease.get();
            LocalDateTime leaseEndDateTime = activeLease.getEndDate().atStartOfDay();
            long hoursRemaining = java.time.Duration.between(LocalDateTime.now(), leaseEndDateTime).toHours();
            
            return ApplicationEligibilityResponse.builder()
                    .canApply(false)
                    .reason("HAS_ACTIVE_LEASE")
                    .blockedUntil(leaseEndDateTime)
                    .hoursRemaining(Math.max(0, hoursRemaining))
                    .build();
        }

        // 3. Check for rejection cooldown (1 day)
        Optional<Application> recentRejection = applicationRepository.findMostRecentRejectedApplication(student, listing);
        if (recentRejection.isPresent()) {
            Application rejectedApp = recentRejection.get();
            LocalDateTime rejectionTime = rejectedApp.getUpdatedAt();
            LocalDateTime cooldownEnd = rejectionTime.plusDays(1);
            
            if (LocalDateTime.now().isBefore(cooldownEnd)) {
                long hoursRemaining = java.time.Duration.between(LocalDateTime.now(), cooldownEnd).toHours();
                return ApplicationEligibilityResponse.builder()
                        .canApply(false)
                        .reason("COOLDOWN")
                        .blockedUntil(cooldownEnd)
                        .hoursRemaining(Math.max(0, hoursRemaining))
                        .build();
            }
        }

        // 4. Eligible to apply
        return ApplicationEligibilityResponse.builder()
                .canApply(true)
                .reason("ELIGIBLE")
                .blockedUntil(null)
                .hoursRemaining(null)
                .build();
    }

    @Transactional(readOnly = true)
    public List<ApplicationResponse> getMyApplications(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!(user instanceof Student student)) {
            throw new RuntimeException("Only students can view applications");
        }

        List<Application> applications = applicationRepository.findByStudentWithDetails(student);

        return applications.stream()
                .map(this::buildApplicationResponse)
                .toList();
    }

    private ApplicationResponse buildApplicationResponse(Application application) {
        Listing listing = application.getListing();
        Landlord landlord = listing.getLandlord();
        
        String listingAddress = listing.getLocation().getAddress() + ", " + listing.getLocation().getCity();
        String landlordName = landlord.getFirstname() + " " + landlord.getLastname();
        String propertyPrice = "₱" + listing.getPrice().getMonthlyrent() + "/month";
        
        // Get main photo URL (first photo from listing)
        String mainPhotoUrl = listing.getPhotos().stream()
                .findFirst()
                .map(photo -> photo.getUrl())
                .orElse(null);

        return ApplicationResponse.builder()
                .id(application.getId())
                .listingId(listing.getId())
                .mainphotourl(mainPhotoUrl)
                .listingTitle(listing.getTitle())
                .listingAddress(listingAddress)
                .propertyPrice(propertyPrice)
                .moveInDate(application.getMoveInDate())
                .leaseTerm(application.getLeaseTerm())
                .phoneNumber(application.getPhoneNumber())
                .applicantMessage(application.getApplicantMessage())
                .status(application.getStatus())
                .createdAt(application.getCreatedAt())
                .responseMessage(application.getResponseMessage())
                .attachmentUrl(application.getAttachmentUrl())
                .landlordName(landlordName)
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

        // Validate application is in PENDING status
        if (application.getStatus() != ApplicationStatus.PENDING) {
            throw new RuntimeException("Only pending applications can be approved. Current status: " + application.getStatus());
        }
        
        // Check if student already has an active lease
        Optional<Lease> existingActiveLease = leaseRepository.findByStudentIdAndLeaseStatus(
                application.getStudent().getId(), 
                LeaseStatus.ACTIVE
        );
        
        if (existingActiveLease.isPresent()) {
            throw new RuntimeException("This student already has an active lease and cannot book another property at this time");
        }

        // Update application status
        application.setStatus(ApplicationStatus.APPROVED);
        application.setResponseMessage(request.message());
        application.setAttachmentUrl(request.attachmentUrl());
        
        // Update move-in date if landlord provides a confirmed date
        if (request.confirmedMoveInDate() != null) {
            application.setMoveInDate(request.confirmedMoveInDate());
        }

        Application updated = applicationRepository.save(application);

        // Create Lease entry for approved application
        Lease lease = new Lease();
        lease.setStudent(application.getStudent());
        lease.setApplication(updated);
        lease.setStartDate(updated.getMoveInDate());
        
        // Calculate end date based on lease term (in months)
        if (updated.getLeaseTerm() != null) {
            lease.setEndDate(updated.getMoveInDate().plusMonths(updated.getLeaseTerm()));
        }
        
        lease.setDocumentUrl(request.attachmentUrl());
        lease.setLeaseStatus(LeaseStatus.ACTIVE);
        
        leaseRepository.save(lease);

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

        // Validate application is in PENDING status
        if (application.getStatus() != ApplicationStatus.PENDING) {
            throw new RuntimeException("Only pending applications can be rejected. Current status: " + application.getStatus());
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
                .leaseTerm(application.getLeaseTerm())
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
                .leaseTerm(application.getLeaseTerm())
                .status(application.getStatus())
                .bookedDate(application.getCreatedAt())
                .build();
    }
}
