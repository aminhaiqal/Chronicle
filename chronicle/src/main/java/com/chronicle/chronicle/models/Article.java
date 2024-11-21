package com.chronicle.chronicle.models;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
public class Article {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Article ID

    private String title; // Article title
    private String slug; // URL-friendly version of the title
    private String content; // Full article content

    private String imageUrl; // URL for the article's main image

    private LocalDateTime publishedAt; // Date and time when the article was published
    private LocalDateTime updatedAt; // Date and time when the article was last updated

    @Enumerated(EnumType.STRING)
    private Status status; // Status of the article (DRAFT, PUBLISHED)

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user; // The user who authored the article

    @OneToMany(mappedBy = "article")
    private List<Comment> comments; // Comments on the article

    @ManyToMany
    @JoinTable(
      name = "article_tag",
      joinColumns = @JoinColumn(name = "article_id"),
      inverseJoinColumns = @JoinColumn(name = "tag_id")
    )
    private List<Tag> tags; // Tags associated with the article

    @ManyToMany
    @JoinTable(
      name = "article_category",
      joinColumns = @JoinColumn(name = "article_id"),
      inverseJoinColumns = @JoinColumn(name = "category_id")
    )
    private List<Category> categories; // Categories for the article

    // Enum for article status (draft or published)
    public enum Status {
        DRAFT,
        PUBLISHED
    }

    // Constructors
    public Article() {
    }

    public Article(String title, String slug, String content, String imageUrl, LocalDateTime publishedAt, LocalDateTime updatedAt, Status status, User user, List<Comment> comments, List<Tag> tags, List<Category> categories) {
        this.title = title;
        this.slug = slug;
        this.content = content;
        this.imageUrl = imageUrl;
        this.publishedAt = publishedAt;
        this.updatedAt = updatedAt;
        this.status = status;
        this.user = user;
        this.comments = comments;
        this.tags = tags;
        this.categories = categories;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSlug() {
        return slug;
    }

    public void setSlug(String slug) {
        this.slug = slug;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public LocalDateTime getPublishedAt() {
        return publishedAt;
    }

    public void setPublishedAt(LocalDateTime publishedAt) {
        this.publishedAt = publishedAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }

    public List<Tag> getTags() {
        return tags;
    }

    public void setTags(List<Tag> tags) {
        this.tags = tags;
    }

    public List<Category> getCategories() {
        return categories;
    }

    public void setCategories(List<Category> categories) {
        this.categories = categories;
    }    
}

