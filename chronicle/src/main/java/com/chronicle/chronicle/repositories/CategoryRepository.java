package com.chronicle.chronicle.repositories;

import com.chronicle.chronicle.models.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

    // Find a category by its name
    Optional<Category> findByName(String name);

    // Check if a category exists by its name
    boolean existsByName(String name);
}
