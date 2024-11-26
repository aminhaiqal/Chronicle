package com.chronicle.chronicle.services;

import com.chronicle.chronicle.models.Tag;
import com.chronicle.chronicle.repositories.TagRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TagService {

    private final TagRepository tagRepository;

    public TagService(TagRepository tagRepository) {
        this.tagRepository = tagRepository;
    }

    // Get all tags
    public List<Tag> getAllTags() {
        return tagRepository.findAll();
    }

    // Get a tag by name
    public Tag getTagByName(String name) {
        return tagRepository.findByName(name)
                .orElseThrow(() -> new IllegalArgumentException("Tag not found with name: " + name));
    }

    // Create a new tag
    public Tag createTag(String name) {
        if (tagRepository.existsByName(name)) {
            throw new IllegalArgumentException("Tag with name already exists: " + name);
        }
        Tag tag = new Tag();
        tag.setName(name);
        return tagRepository.save(tag);
    }

    // Delete a tag by ID
    public void deleteTagById(Long id) {
        tagRepository.deleteById(id);
    }
}
