package com.chronicle.chronicle.repositories;

import com.chronicle.chronicle.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // Find a user by Firebase UID
    Optional<User> findByFirebaseUid(String firebaseUid);

    // Find a user by email
    Optional<User> findByEmail(String email);

    // Check if a user exists by Firebase UID
    boolean existsByFirebaseUid(String firebaseUid);

    // Check if a user exists by email
    boolean existsByEmail(String email);
}
