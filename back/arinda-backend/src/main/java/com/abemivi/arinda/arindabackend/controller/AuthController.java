package com.abemivi.arinda.arindabackend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.abemivi.arinda.arindabackend.dto.authentication.AuthenticationResponse;
import com.abemivi.arinda.arindabackend.dto.authentication.LoginRequest;
import com.abemivi.arinda.arindabackend.dto.authentication.RegisterRequest;
import com.abemivi.arinda.arindabackend.entity.Landlord;
import com.abemivi.arinda.arindabackend.entity.Student;
import com.abemivi.arinda.arindabackend.entity.User;
import com.abemivi.arinda.arindabackend.repository.UserRepository;
import com.abemivi.arinda.arindabackend.service.JwtService;
import com.abemivi.arinda.arindabackend.service.SanitizationService; // 1. Import Service

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final SanitizationService sanitizer;

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody LoginRequest request) {
        String cleanEmail = sanitizer.sanitizeStrict(request.email());

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(cleanEmail, request.password()));

        var user = userRepository.findByEmail(cleanEmail).orElseThrow();
        var jwtToken = jwtService.generateToken(user);

        AuthenticationResponse response = AuthenticationResponse.builder()
                .token(jwtToken)
                .role(user.getRole())
                .id(user.getId())
                .email(user.getEmail())
                .firstname(user.getFirstname())
                .lastname(user.getLastname())
                .build();

        return ResponseEntity.ok(response);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        try {
            String cleanEmail = sanitizer.sanitizeStrict(request.email());
            String cleanFirstName = sanitizer.sanitizeStrict(request.firstname());
            String cleanLastName = sanitizer.sanitizeStrict(request.lastname());

            // Check if user already exists using CLEAN email
            if (userRepository.findByEmail(cleanEmail).isPresent()) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                        .body("Email already registered");
            }

            // Check student ID using CLEAN input
            if (request.role() == com.abemivi.arinda.arindabackend.entity.enums.Role.STUDENT) {
                String cleanStudentId = sanitizer.sanitizeStrict(request.studentid());
                if (cleanStudentId != null && userRepository.findByStudentid(cleanStudentId).isPresent()) {
                    return ResponseEntity.status(HttpStatus.CONFLICT)
                            .body("Student ID already registered");
                }
            }

            User user;

            switch (request.role()) {
                case STUDENT:
                    Student student = new Student();
                    student.setSchool(sanitizer.sanitizeStrict(request.school()));
                    student.setStudentid(sanitizer.sanitizeStrict(request.studentid()));
                    user = student;
                    break;
                case LANDLORD:
                    Landlord landlord = new Landlord();
                    landlord.setPhonenumber(sanitizer.sanitizeStrict(request.phonenumber()));
                    user = landlord;
                    break;
                default:
                    return ResponseEntity.badRequest().body("Invalid role");
            }

            user.setFirstname(cleanFirstName);
            user.setLastname(cleanLastName);
            user.setEmail(cleanEmail);
            user.setPasswordhash(passwordEncoder.encode(request.passwordhash()));
            user.setRole(request.role());

            userRepository.save(user);

            var jwtToken = jwtService.generateToken(user);

            AuthenticationResponse response = AuthenticationResponse.builder()
                    .token(jwtToken)
                    .role(user.getRole())
                    .id(user.getId())
                    .email(user.getEmail())
                    .firstname(user.getFirstname())
                    .lastname(user.getLastname())
                    .build();

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Registration failed: " + e.getMessage());
        }
    }
}