package com.chronicle.chronicle.models;

import java.time.LocalDateTime;
import jakarta.persistence.*;

@Entity
public class Follower {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Follower record ID

    @ManyToOne
    @JoinColumn(name = "follower_id")
    private User follower; // The user who is following

    @ManyToOne
    @JoinColumn(name = "following_id")
    private User following; // The user being followed

    private LocalDateTime createdAt; // Date and time when the following relationship was created

    // Constructors
    public Follower() {
    }

    public Follower(User follower, User following, LocalDateTime createdAt) {
        this.follower = follower;
        this.following = following;
        this.createdAt = createdAt;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getFollower() {
        return follower;
    }

    public void setFollower(User follower) {
        this.follower = follower;
    }

    public User getFollowing() {
        return following;
    }

    public void setFollowing(User following) {
        this.following = following;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
