package com.abemivi.arinda.arindabackend.service;

import com.abemivi.arinda.arindabackend.dto.profile.LandlordProfileResponse;
import com.abemivi.arinda.arindabackend.dto.profile.UpdateLandlordProfileRequest;
import com.abemivi.arinda.arindabackend.entity.Landlord;
import com.abemivi.arinda.arindabackend.entity.User;
import com.abemivi.arinda.arindabackend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class LandlordProfileService {
    private final UserRepository userRepository;

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
