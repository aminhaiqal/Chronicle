package com.chronicle.chronicle.models;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Like {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Like ID

    private LocalDateTime createdAt; // Date and time when the like was given

    @ManyToOne
    @JoinColumn(name = "article_id")
    private Article article; // The article that was liked

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user; // The user who liked the article

    // Constructors
    public Like() {
    }

    public Like(LocalDateTime createdAt, Article article, User user) {
        this.createdAt = createdAt;
        this.article = article;
        this.user = user;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public Article getArticle() {
        return article;
    }

    public void setArticle(Article article) {
        this.article = article;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}