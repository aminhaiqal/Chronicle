package com.chronicle.chronicle.models;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Internal user ID

    private String oktaId; // Okta ID (unique identifier from Okta)
    private String email;
    private String fullName;
    private String profilePictureUrl; // URL to the user's profile picture

    private String bio; // A short biography of the user

    @OneToMany(mappedBy = "user")
    private List<Article> articles; // Articles written by the user

    @OneToMany(mappedBy = "user")
    private List<Comment> comments; // Comments made by the user

    @ManyToMany(mappedBy = "followers")
    private List<User> following; // Users that the user is following

    @ManyToMany(mappedBy = "following")
    private List<User> followers; // Users following the user

    // Constructors
    public User() {
    }

    public User(String oktaId, String email, String fullName, String profilePictureUrl, String bio, List<Article> articles, List<Comment> comments, List<User> following, List<User> followers) {
        this.oktaId = oktaId;
        this.email = email;
        this.fullName = fullName;
        this.profilePictureUrl = profilePictureUrl;
        this.bio = bio;
        this.articles = articles;
        this.comments = comments;
        this.following = following;
        this.followers = followers;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getOktaId() {
        return oktaId;
    }

    public void setOktaId(String oktaId) {
        this.oktaId = oktaId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getProfilePictureUrl() {
        return profilePictureUrl;
    }

    public void setProfilePictureUrl(String profilePictureUrl) {
        this.profilePictureUrl = profilePictureUrl;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public List<Article> getArticles() {
        return articles;
    }

    public void setArticles(List<Article> articles) {
        this.articles = articles;
    }

    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }

    public List<User> getFollowing() {
        return following;
    }

    public void setFollowing(List<User> following) {
        this.following = following;
    }

    public List<User> getFollowers() {
        return followers;
    }

    public void setFollowers(List<User> followers) {
        this.followers = followers;
    }
}
