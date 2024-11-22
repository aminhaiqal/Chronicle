package com.chronicle.chronicle.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import com.chronicle.chronicle.models.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByFirebaseUid(String firebaseUid);
    
}
