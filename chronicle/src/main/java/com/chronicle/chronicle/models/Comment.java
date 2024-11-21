package com.chronicle.chronicle.models;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Comment ID

    private String content; // Content of the comment

    private LocalDateTime createdAt; // Date and time when the comment was created

    @ManyToOne
    @JoinColumn(name = "article_id")
    private Article article; // The article this comment is associated with

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user; // The user who made the comment

    // Constructors
    public Comment() {
    }

    public Comment(String content, LocalDateTime createdAt, Article article, User user) {
        this.content = content;
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

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
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
