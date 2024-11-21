package com.chronicle.chronicle.models;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class Tag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Tag ID

    private String name; // Name of the tag

    @ManyToMany(mappedBy = "tags")
    private List<Article> articles; // Articles associated with this tag

    // Constructors
    public Tag() {
    }

    public Tag(String name, List<Article> articles) {
        this.name = name;
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

    public List<Article> getArticles() {
        return articles;
    }

    public void setArticles(List<Article> articles) {
        this.articles = articles;
    }
}