package com.chronicle.chronicle.services;

import com.chronicle.chronicle.dto.ArticleDTO;
import com.chronicle.chronicle.models.*;
import com.chronicle.chronicle.repositories.ArticleRepository;
import com.chronicle.chronicle.repositories.CategoryRepository;
import com.chronicle.chronicle.repositories.TagRepository;
import com.chronicle.chronicle.repositories.UserRepository;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ArticleService {
    private final ArticleRepository articleRepository;
    private final UserRepository userRepository;
    private final TagRepository tagRepository;
    private final CategoryRepository categoryRepository;

    public ArticleService(ArticleRepository articleRepository, UserRepository userRepository,
            TagRepository tagRepository, CategoryRepository categoryRepository) {
        this.articleRepository = articleRepository;
        this.userRepository = userRepository;
        this.tagRepository = tagRepository;
        this.categoryRepository = categoryRepository;
    }

    public Article createArticle(ArticleDTO articleDTO) {
        User user = userRepository.findById(articleDTO.getUserId())
                .orElseThrow(() -> new EntityNotFoundException("User not found with ID: " + articleDTO.getUserId()));

        List<Tag> tags = tagRepository.findAllById(articleDTO.getTagIds());
        List<Category> categories = categoryRepository.findAllById(articleDTO.getCategoryIds());

        Article article = new Article();
        article.setTitle(articleDTO.getTitle());
        article.setSlug(articleDTO.getSlug());
        article.setContent(articleDTO.getContent());
        article.setImageUrl(articleDTO.getImageUrl());
        article.setStatus(Article.Status.valueOf(articleDTO.getStatus()));
        article.setPublishedAt(LocalDateTime.now());
        article.setUpdatedAt(LocalDateTime.now());
        article.setUser(user);
        article.setTags(tags);
        article.setCategories(categories);

        return articleRepository.save(article);
    }
}
