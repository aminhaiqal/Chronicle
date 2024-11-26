package com.chronicle.chronicle.services;

import com.chronicle.chronicle.models.User;
import com.chronicle.chronicle.repositories.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User getUserByFirebaseUid(String firebaseUid) {
        return userRepository.findByFirebaseUid(firebaseUid)
                .orElseThrow(() -> new EntityNotFoundException("User not found with Firebase UID: " + firebaseUid));
    }

    public boolean isEmailTaken(String email) {
        return userRepository.existsByEmail(email);
    }

    public User createUser(User user) {
        if (userRepository.existsByFirebaseUid(user.getFirebaseUid())) {
            throw new IllegalArgumentException("User with Firebase UID already exists");
        }
        return userRepository.save(user);
    }
}
