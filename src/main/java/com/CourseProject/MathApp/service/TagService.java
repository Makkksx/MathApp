package com.CourseProject.MathApp.service;

import com.CourseProject.MathApp.models.Tag;
import com.CourseProject.MathApp.payload.TagDto;

import java.util.List;

public interface TagService {
    Iterable<Tag> saveTags(Iterable<Tag> tags);

    List<String> getAllTagNames();

    List<TagDto> getAllTags();
}
