package com.chronicle.chronicle.repositories;

import com.chronicle.chronicle.models.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TagRepository extends JpaRepository<Tag, Long> {

    // Find a tag by its name
    Optional<Tag> findByName(String name);

    // Check if a tag exists by its name
    boolean existsByName(String name);
}
