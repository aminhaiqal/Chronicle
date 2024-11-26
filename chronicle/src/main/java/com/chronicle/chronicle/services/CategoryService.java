package com.chronicle.chronicle.services;

import com.chronicle.chronicle.models.Category;
import com.chronicle.chronicle.repositories.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    // Get all categories
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    // Get a category by name
    public Category getCategoryByName(String name) {
        return categoryRepository.findByName(name)
                .orElseThrow(() -> new IllegalArgumentException("Category not found with name: " + name));
    }

    // Create a new category
    public Category createCategory(String name, String description) {
        if (categoryRepository.existsByName(name)) {
            throw new IllegalArgumentException("Category with name already exists: " + name);
        }
        if (name == null || name.trim().isEmpty()) {
            throw new IllegalArgumentException("Category name cannot be empty");
        }
        if (description == null || description.trim().isEmpty()) {
            throw new IllegalArgumentException("Category description cannot be empty");
        }
        
        Category category = new Category();
        category.setName(name);
        category.setDescription(description);
        return categoryRepository.save(category);
    }

    // Delete a category by ID
    public void deleteCategoryById(Long id) {
        Optional<Category> category = categoryRepository.findById(id);
        if (category.isPresent()) {
            categoryRepository.deleteById(id);
        } else {
            throw new IllegalArgumentException("Category not found with ID: " + id);
        }
    }
}
