package com.chronicle.chronicle.models;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Category ID

    @Column(unique = true, nullable = false)
    private String name; // Name of the category
    private String description; // Description of the category

    @ManyToMany(mappedBy = "categories")
    private List<Article> articles; // Articles associated with this category

    // Constructors
    public Category() {
    }

    public Category(String name, String description, List<Article> articles) {
        this.name = name;
        this.description = description;
        this.articles = articles;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}