package com.abemivi.arinda.arindabackend.controller;

import com.abemivi.arinda.arindabackend.dto.AuthenticationResponse;
import com.abemivi.arinda.arindabackend.dto.LoginRequest;
import com.abemivi.arinda.arindabackend.dto.RegisterRequest;
import com.abemivi.arinda.arindabackend.entity.Landlord;
import com.abemivi.arinda.arindabackend.entity.Student;
import com.abemivi.arinda.arindabackend.entity.User;
import com.abemivi.arinda.arindabackend.entity.enums.Role;
import com.abemivi.arinda.arindabackend.repository.UserRepository;
import com.abemivi.arinda.arindabackend.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody LoginRequest request) {
        // 1. This line does the authentication check
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.email(), request.password()));

        // 2. If successful, get user and generate token
        var user = userRepository.findByEmail(request.email()).orElseThrow();
        var jwtToken = jwtService.generateToken(user);

        // 3. Return the token
        return ResponseEntity.ok(new AuthenticationResponse(jwtToken, user.getRole()));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        try {
            // Check if user already exists
            if (userRepository.findByEmail(request.email()).isPresent()) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                        .body("Email already registered");
            }

            // 1. Create a new user object based on the role
            User user;

            switch (request.role()) {
                case STUDENT:
                    Student student = new Student();
                    // Set Student-specific fields from the request
                    student.setSchool(request.school());
                    student.setStudentid(request.studentid());
                    user = student;
                    break;
                case LANDLORD:
                    Landlord landlord = new Landlord();
                    landlord.setPhonenumber(request.phonenumber());
                    user = landlord;
                    break;
                default:
                    return ResponseEntity.badRequest().body("Invalid role"); // Or throw exception
            }

            // 2. Set common fields
            user.setFirstname(request.firstname());
            user.setLastname(request.lastname());
            user.setEmail(request.email());
            user.setPasswordhash(passwordEncoder.encode(request.passwordhash()));

            // 3. Save the new user to the database
            userRepository.save(user);

            // 4. Generate a token for the new user
            var jwtToken = jwtService.generateToken(user);

            // 5. Return the token
            return ResponseEntity.ok(new AuthenticationResponse(jwtToken, user.getRole()));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Registration failed: " + e.getMessage());
        }
    }
}