package com.abemivi.arinda.arindabackend.mapper;

import java.util.Optional;

import org.springframework.stereotype.Component;

import com.abemivi.arinda.arindabackend.dto.lease.TenantResponse;
import com.abemivi.arinda.arindabackend.entity.Application;
import com.abemivi.arinda.arindabackend.entity.Lease;
import com.abemivi.arinda.arindabackend.entity.Listing;
import com.abemivi.arinda.arindabackend.entity.Student;
import com.abemivi.arinda.arindabackend.entity.enums.LeaseStatus;
import com.abemivi.arinda.arindabackend.repository.LeaseRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class TenantMapper {

    private final LeaseRepository leaseRepository;

    public TenantResponse toTenantResponse(Application application) {
        Student student = application.getStudent();
        Listing listing = application.getListing();
        
        // Try to get lease if it exists (using application ID to find lease)
        Optional<Lease> leaseOpt = leaseRepository.findByApplicationId(application.getId());
        Lease lease = leaseOpt.orElse(null);
        
        // Determine lease status
        LeaseStatus leaseStatus = (lease != null) ? lease.getLeaseStatus() : LeaseStatus.ACTIVE;
        Long leaseId = (lease != null) ? lease.getId() : application.getId(); // Use application ID as fallback

        return TenantResponse.builder()
                .leaseId(leaseId)
                .tenant(TenantResponse.TenantInfo.builder()
                        .id(student.getId())
                        .name(student.getFirstname() + " " + student.getLastname())
                        .email(student.getEmail())
                        .studentId(student.getStudentid())
                        .university(student.getSchool())
                        .build())
                .property(TenantResponse.PropertyInfo.builder()
                        .id(listing.getId())
                        .title(listing.getTitle())
                        .address(listing.getLocation() != null ? listing.getLocation().getAddress() : null)
                        .build())
                .startDate(application.getMoveInDate())
                .endDate(application.getMoveInDate() != null && application.getLeaseTerm() != null 
                        ? application.getMoveInDate().plusMonths(application.getLeaseTerm()) 
                        : null)
                .leaseStatus(leaseStatus)
                .documentUrl(application.getAttachmentUrl())
                .phoneNumber(application.getPhoneNumber())
                .leaseTerm(application.getLeaseTerm())
                .monthlyRent(listing.getPrice() != null ? (double) listing.getPrice().getMonthlyrent() : null)
                .build();
    }
}
