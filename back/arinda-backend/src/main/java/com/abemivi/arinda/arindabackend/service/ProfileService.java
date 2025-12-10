package com.abemivi.arinda.arindabackend.service;

import com.abemivi.arinda.arindabackend.dto.profile.LandlordProfileResponse;
import com.abemivi.arinda.arindabackend.dto.profile.ProfileResponse;
import com.abemivi.arinda.arindabackend.dto.profile.UpdateLandlordProfileRequest;
import com.abemivi.arinda.arindabackend.dto.profile.UpdateProfileRequest;
import com.abemivi.arinda.arindabackend.entity.Landlord;
import com.abemivi.arinda.arindabackend.entity.Student;
import com.abemivi.arinda.arindabackend.entity.User;
import com.abemivi.arinda.arindabackend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ProfileService {
    private final UserRepository userRepository;

    public ProfileResponse getProfile(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        ProfileResponse.ProfileResponseBuilder builder = ProfileResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .firstname(user.getFirstname())
                .lastname(user.getLastname())
                .role(user.getRole());

        // Add student-specific fields if user is a student
        if (user instanceof Student student) {
            builder.school(student.getSchool())
                   .studentid(student.getStudentid());
        }

        return builder.build();
    }

    @Transactional
    public ProfileResponse updateProfile(String email, UpdateProfileRequest request) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Update common fields
        user.setFirstname(request.firstname());
        user.setLastname(request.lastname());

        // Update student-specific fields if user is a student
        if (user instanceof Student student) {
            if (request.school() != null) {
                student.setSchool(request.school());
            }
            if (request.studentid() != null) {
                student.setStudentid(request.studentid());
            }
        }

        User updatedUser = userRepository.save(user);

        // Build response
        ProfileResponse.ProfileResponseBuilder builder = ProfileResponse.builder()
                .id(updatedUser.getId())
                .email(updatedUser.getEmail())
                .firstname(updatedUser.getFirstname())
                .lastname(updatedUser.getLastname())
                .role(updatedUser.getRole());

        if (updatedUser instanceof Student student) {
            builder.school(student.getSchool())
                   .studentid(student.getStudentid());
        }

        return builder.build();
    }

    // Landlord-specific methods
    public LandlordProfileResponse getLandlordProfile(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!(user instanceof Landlord landlord)) {
            throw new RuntimeException("User is not a landlord");
        }

        return LandlordProfileResponse.builder()
                .id(landlord.getId())
                .email(landlord.getEmail())
                .firstname(landlord.getFirstname())
                .lastname(landlord.getLastname())
                .role(landlord.getRole())
                .phonenumber(landlord.getPhonenumber())
                .build();
    }

    @Transactional
    public LandlordProfileResponse updateLandlordProfile(String email, UpdateLandlordProfileRequest request) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!(user instanceof Landlord landlord)) {
            throw new RuntimeException("User is not a landlord");
        }

        // Update fields
        landlord.setFirstname(request.firstname());
        landlord.setLastname(request.lastname());
        if (request.phonenumber() != null) {
            landlord.setPhonenumber(request.phonenumber());
        }

        Landlord updatedLandlord = userRepository.save(landlord);

        return LandlordProfileResponse.builder()
                .id(updatedLandlord.getId())
                .email(updatedLandlord.getEmail())
                .firstname(updatedLandlord.getFirstname())
                .lastname(updatedLandlord.getLastname())
                .role(updatedLandlord.getRole())
                .phonenumber(updatedLandlord.getPhonenumber())
                .build();
    }
}
