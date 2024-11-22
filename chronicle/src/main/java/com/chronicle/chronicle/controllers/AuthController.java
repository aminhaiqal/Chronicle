package com.chronicle.chronicle.controllers;

import com.chronicle.chronicle.models.User;
import com.chronicle.chronicle.repositories.UserRepository;
import com.chronicle.chronicle.services.FirebaseService;
import com.google.firebase.auth.FirebaseToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private FirebaseService firebaseService;

    @Autowired
    private UserRepository userRepository;

    // Endpoint to verify the Firebase ID token
    @PostMapping("/verify")
    public String verifyIdToken(@RequestBody String idToken) {
        try {
            // Verify the ID token using Firebase service
            FirebaseToken decodedToken = firebaseService.verifyIdToken(idToken);
            String firebaseUid = decodedToken.getUid();
            String email = decodedToken.getEmail();
            String fullName = decodedToken.getName(); // Firebase provides name if available
            String profilePictureUrl = decodedToken.getPicture(); // Profile picture URL, if available

            // Check if the user already exists in the database
            User existingUser = userRepository.findByFirebaseUid(firebaseUid).orElse(null);

            if (existingUser == null) {
                // Create a new user if not exists
                User newUser = new User();
                newUser.setFirebaseUid(firebaseUid);
                newUser.setEmail(email);
                newUser.setFullName(fullName);
                newUser.setProfilePictureUrl(profilePictureUrl);

                // Save the new user to the database
                userRepository.save(newUser);
                return "User authenticated and saved: " + fullName + " (" + email + ")";
            } else {
                return "User already exists: " + existingUser.getFullName();
            }

        } catch (Exception e) {
            return "Error verifying token: " + e.getMessage();
        }
    }
}