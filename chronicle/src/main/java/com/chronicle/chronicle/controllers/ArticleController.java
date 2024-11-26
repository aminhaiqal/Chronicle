package com.chronicle.chronicle.controllers;

import com.chronicle.chronicle.dto.ArticleDTO;
import com.chronicle.chronicle.models.Article;
import com.chronicle.chronicle.services.ArticleService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/articles")
public class ArticleController {

    private final ArticleService articleService;

    public ArticleController(ArticleService articleService) {
        this.articleService = articleService;
    }

    @PostMapping
    public ResponseEntity<Article> createArticle(@RequestBody ArticleDTO articleDTO) {
        Article article = articleService.createArticle(articleDTO);
        return new ResponseEntity<>(article, HttpStatus.CREATED);
    }
}
