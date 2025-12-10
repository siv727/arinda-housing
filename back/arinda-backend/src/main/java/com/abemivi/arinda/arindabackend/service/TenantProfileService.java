package com.abemivi.arinda.arindabackend.service;

import com.abemivi.arinda.arindabackend.dto.profile.TenantProfileResponse;
import com.abemivi.arinda.arindabackend.dto.profile.UpdateTenantProfileRequest;
import com.abemivi.arinda.arindabackend.entity.Student;
import com.abemivi.arinda.arindabackend.entity.User;
import com.abemivi.arinda.arindabackend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class TenantProfileService {
    private final UserRepository userRepository;

    public TenantProfileResponse getTenantProfile(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!(user instanceof Student student)) {
            throw new RuntimeException("User is not a tenant");
        }

        return TenantProfileResponse.builder()
                .id(student.getId())
                .email(student.getEmail())
                .firstname(student.getFirstname())
                .lastname(student.getLastname())
                .role(student.getRole())
                .school(student.getSchool())
                .studentid(student.getStudentid())
                .build();
    }

    @Transactional
    public TenantProfileResponse updateTenantProfile(String email, UpdateTenantProfileRequest request) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!(user instanceof Student student)) {
            throw new RuntimeException("User is not a tenant");
        }

        // Update fields
        student.setFirstname(request.firstname());
        student.setLastname(request.lastname());
        if (request.school() != null) {
            student.setSchool(request.school());
        }
        if (request.studentid() != null) {
            student.setStudentid(request.studentid());
        }

        Student updatedStudent = userRepository.save(student);

        return TenantProfileResponse.builder()
                .id(updatedStudent.getId())
                .email(updatedStudent.getEmail())
                .firstname(updatedStudent.getFirstname())
                .lastname(updatedStudent.getLastname())
                .role(updatedStudent.getRole())
                .school(updatedStudent.getSchool())
                .studentid(updatedStudent.getStudentid())
                .build();
    }
}
