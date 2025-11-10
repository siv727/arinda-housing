package com.abemivi.arinda.arindabackend.dto;

import com.abemivi.arinda.arindabackend.entity.enums.Role;

public record RegisterRequest(
        String firstname,
        String lastname,
        String email,
        String passwordhash,
        Role role,
        String school,
        String studentid,
        String phonenumber
) {
}
