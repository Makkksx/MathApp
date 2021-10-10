package com.CourseProject.MathApp.service;

import com.CourseProject.MathApp.mapper.TagMapper;
import com.CourseProject.MathApp.mapper.TagMapperImpl;
import com.CourseProject.MathApp.models.Tag;
import com.CourseProject.MathApp.payload.TagDto;
import com.CourseProject.MathApp.repo.TagRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TagServiceImpl implements TagService {
    private final TagRepository tagRepository;
    private final TagMapper mapper = new TagMapperImpl();
    public TagServiceImpl(TagRepository tagRepository) {
        this.tagRepository = tagRepository;
    }

    @Override
    public List<Tag> saveTags(Iterable<Tag> tags) {
        List<Tag> tagList = new ArrayList<>();
        for (Tag tag : tags) {
            Tag repoTag = tagRepository.findFirstByName(tag.getName()).orElse(tag);
            repoTag.incCount();
            tagList.add(repoTag);
        }
        return tagRepository.saveAll(tagList);
    }

    @Override
    public List<String> getAllTagNames() {
        List<String> tagDTOList = new ArrayList<>();
        List<Tag> tagList = tagRepository.findAll();
        for (Tag tag : tagList) {
            tagDTOList.add(tag.getName());
        }
        return tagDTOList;
    }

    @Override
    public List<TagDto> getAllTags() {
        List<TagDto> tagDTOList = new ArrayList<>();
        List<Tag> tagList = tagRepository.findAll();
        for (Tag tag : tagList) {
            tagDTOList.add(mapper.toDto(tag));
        }
        return tagDTOList;
    }
}
