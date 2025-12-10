package com.abemivi.arinda.arindabackend.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.abemivi.arinda.arindabackend.dto.tenant.TenantResponse;
import com.abemivi.arinda.arindabackend.dto.tenant.UpdatePaymentStatusRequest;
import com.abemivi.arinda.arindabackend.entity.Application;
import com.abemivi.arinda.arindabackend.entity.Lease;
import com.abemivi.arinda.arindabackend.entity.Listing;
import com.abemivi.arinda.arindabackend.entity.Student;
import com.abemivi.arinda.arindabackend.entity.enums.ApplicationStatus;
import com.abemivi.arinda.arindabackend.repository.LeaseRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TenantService {
    private final LeaseRepository leaseRepository;

    @Transactional(readOnly = true)
    public List<TenantResponse> getLandlordTenants(String landlordEmail) {
        List<Lease> leases = leaseRepository.findByLandlordEmail(landlordEmail);
        return leases.stream()
                .map(this::buildTenantResponse)
                .toList();
    }

    @Transactional
    public TenantResponse updatePaymentStatus(String landlordEmail, Long leaseId, UpdatePaymentStatusRequest request) {
        Lease lease = leaseRepository.findById(leaseId)
                .orElseThrow(() -> new RuntimeException("Lease not found"));

        // Verify landlord owns this property
        String propertyLandlordEmail = lease.getApplication().getListing().getLandlord().getEmail();
        if (!propertyLandlordEmail.equals(landlordEmail)) {
            throw new RuntimeException("Unauthorized: This lease does not belong to your property");
        }

        lease.setPaymentStatus(request.paymentStatus());
        Lease updatedLease = leaseRepository.save(lease);
        
        return buildTenantResponse(updatedLease);
    }

    @Transactional
    public void endLease(String landlordEmail, Long leaseId) {
        Lease lease = leaseRepository.findById(leaseId)
                .orElseThrow(() -> new RuntimeException("Lease not found"));

        // Verify landlord owns this property
        String propertyLandlordEmail = lease.getApplication().getListing().getLandlord().getEmail();
        if (!propertyLandlordEmail.equals(landlordEmail)) {
            throw new RuntimeException("Unauthorized: This lease does not belong to your property");
        }

        // Update application status to REJECTED (end lease)
        Application application = lease.getApplication();
        application.setStatus(ApplicationStatus.REJECTED);
        
        // Note: Ignoring eviction logic as per user instructions
    }

    private TenantResponse buildTenantResponse(Lease lease) {
        Student student = lease.getStudent();
        Application application = lease.getApplication();
        Listing listing = application.getListing();

        TenantResponse.TenantInfo tenantInfo = new TenantResponse.TenantInfo(
                student.getId(),
                student.getFirstname() + " " + student.getLastname(),
                student.getEmail(),
                student.getSchool()
        );

        TenantResponse.PropertyInfo propertyInfo = new TenantResponse.PropertyInfo(
                listing.getId(),
                listing.getTitle(),
                listing.getLocation().getAddress(),
                listing.getLocation().getCity(),
                listing.getPhotos() != null && !listing.getPhotos().isEmpty() 
                    ? listing.getPhotos().get(0).getUrl() 
                    : null
        );

        return new TenantResponse(
                lease.getId(),
                tenantInfo,
                propertyInfo,
                lease.getPaymentStatus(),
                lease.getStartDate(),
                lease.getEndDate(),
                (double) listing.getPrice().getMonthlyrent(),
                lease.getDocumentUrl()
        );
    }
}
