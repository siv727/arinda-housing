package com.abemivi.arinda.arindabackend.config;

import com.abemivi.arinda.arindabackend.service.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {
    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain) throws ServletException, IOException {

        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String userEmail;

        // 1. Check for header and "Bearer " prefix
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response); // Pass request on
            return;
        }

        // 2. Extract the token
        jwt = authHeader.substring(7); // "Bearer ".length()

        // 3. Extract email from token
        try {
            userEmail = jwtService.extractUsername(jwt);
        } catch (Exception e) {
            // ExpiredJwtException, MalformedJwtException, SignatureException
            // If the token is invalid, we don't authenticate.
            // We just pass the request on, and SecurityConfig will block it.
            filterChain.doFilter(request, response);
            return;
        }

        // 4. Check if email exists AND if user is not already authenticated
        if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(userEmail);

            // 5. If token is valid, authenticate the user for this request
            if (jwtService.isTokenValid(jwt, userDetails)) {
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails,
                        null, // We don't need credentials (passwordhash) at this stage, the JWT is the proof.
                        userDetails.getAuthorities());

                // Attaches details like IP address to the auth object for logging.
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                // Tells Spring Security the user is authenticated
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }

        // Pass the request to the next filter in the chain.
        filterChain.doFilter(request, response);
    }
}
