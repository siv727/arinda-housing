package com.abemivi.arinda.arindabackend.dto;

import com.abemivi.arinda.arindabackend.entity.enums.Role;

public record AuthenticationResponse(String token, Role role) {
}
