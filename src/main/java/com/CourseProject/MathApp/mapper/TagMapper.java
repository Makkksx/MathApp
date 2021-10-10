package com.CourseProject.MathApp.mapper;

import com.CourseProject.MathApp.models.Tag;
import com.CourseProject.MathApp.payload.TagDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper
public interface TagMapper {
    @Mapping(source = "name", target = "value")
    TagDto toDto(Tag tag);
}
