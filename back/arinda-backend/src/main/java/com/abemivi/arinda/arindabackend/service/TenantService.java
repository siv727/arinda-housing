package com.abemivi.arinda.arindabackend.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.abemivi.arinda.arindabackend.dto.lease.TenantResponse;
import com.abemivi.arinda.arindabackend.dto.lease.TenantSummary;
import com.abemivi.arinda.arindabackend.entity.Application;
import com.abemivi.arinda.arindabackend.entity.Landlord;
import com.abemivi.arinda.arindabackend.entity.Lease;
import com.abemivi.arinda.arindabackend.entity.enums.ApplicationStatus;
import com.abemivi.arinda.arindabackend.entity.enums.LeaseStatus;
import com.abemivi.arinda.arindabackend.mapper.TenantMapper;
import com.abemivi.arinda.arindabackend.repository.ApplicationRepository;
import com.abemivi.arinda.arindabackend.repository.LeaseRepository;
import com.abemivi.arinda.arindabackend.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TenantService {
    private final LeaseRepository leaseRepository;
    private final ApplicationRepository applicationRepository;
    private final UserRepository userRepository;
    private final TenantMapper tenantMapper;

    @Transactional(readOnly = true)
    public List<TenantSummary> getLandlordTenants(Long landlordId) {
        // Fetch landlord to use in query
        Landlord landlord = (Landlord) userRepository.findById(landlordId)
                .orElseThrow(() -> new RuntimeException("Landlord not found"));
        
        // Get all approved applications for this landlord's listings
        List<Application> approvedApplications = applicationRepository.findByListingLandlord(landlord)
                .stream()
                .filter(app -> app.getStatus() == ApplicationStatus.APPROVED)
                .collect(Collectors.toList());
        
        return approvedApplications.stream()
                .map(tenantMapper::toTenantSummary)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public TenantResponse getTenantDetails(Long landlordId, Long leaseId) {
        // Fetch landlord to use in query
        Landlord landlord = (Landlord) userRepository.findById(landlordId)
                .orElseThrow(() -> new RuntimeException("Landlord not found"));
        
        // Get all approved applications for this landlord's listings
        List<Application> approvedApplications = applicationRepository.findByListingLandlord(landlord)
                .stream()
                .filter(app -> app.getStatus() == ApplicationStatus.APPROVED)
                .collect(Collectors.toList());
        
        // Find the specific tenant by leaseId (which could be lease ID or application ID)
        Application application = approvedApplications.stream()
                .filter(app -> {
                    // Try to find lease by application ID
                    var leaseOpt = leaseRepository.findByApplicationId(app.getId());
                    if (leaseOpt.isPresent() && leaseOpt.get().getId().equals(leaseId)) {
                        return true;
                    }
                    // Fallback to application ID
                    return app.getId().equals(leaseId);
                })
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Tenant not found"));
        
        return tenantMapper.toTenantResponse(application);
    }

    @Transactional
    public void endLease(Long leaseId) {
        // Try to find lease by lease ID first
        Optional<Lease> leaseOpt = leaseRepository.findById(leaseId);
        
        // If not found, try to find by application ID (fallback)
        if (leaseOpt.isEmpty()) {
            leaseOpt = leaseRepository.findByApplicationId(leaseId);
        }
        
        Lease lease = leaseOpt.orElseThrow(() -> new RuntimeException("Lease not found"));
        lease.setLeaseStatus(LeaseStatus.COMPLETED);
        leaseRepository.save(lease);
        
        // Also update the Application status so tenant's view reflects the change
        Application application = lease.getApplication();
        if (application != null) {
            application.setStatus(ApplicationStatus.COMPLETED);
            applicationRepository.save(application);
        }
    }

    @Transactional
    public void evictTenant(Long leaseId) {
        // Try to find lease by lease ID first
        Optional<Lease> leaseOpt = leaseRepository.findById(leaseId);
        
        // If not found, try to find by application ID (fallback)
        if (leaseOpt.isEmpty()) {
            leaseOpt = leaseRepository.findByApplicationId(leaseId);
        }
        
        Lease lease = leaseOpt.orElseThrow(() -> new RuntimeException("Lease not found"));
        lease.setLeaseStatus(LeaseStatus.EVICTED);
        leaseRepository.save(lease);
        
        // Also update the Application status so tenant's view reflects the change
        Application application = lease.getApplication();
        if (application != null) {
            application.setStatus(ApplicationStatus.EVICTED);
            applicationRepository.save(application);
        }
    }
}
