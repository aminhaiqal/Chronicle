package com.chronicle.chronicle.controllers;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    // This endpoint will return the authenticated user's details.
    @GetMapping("/profile")
    public String getUserProfile(@AuthenticationPrincipal OidcUser principal) {
        // Accessing user information
        String userName = principal.getFullName();
        String userEmail = principal.getEmail();
        
        return "Hello " + userName + "! Your email is " + userEmail;
    }

    // A public endpoint for testing that doesn't require authentication.
    @GetMapping("/public")
    public String publicEndpoint() {
        return "This is a public endpoint, no authentication required!";
    }
}
