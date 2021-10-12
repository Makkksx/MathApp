package com.CourseProject.MathApp.mapper;

import com.CourseProject.MathApp.models.Task;
import com.CourseProject.MathApp.payload.TaskDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper
public interface TaskMapper {
    @Mapping(target = "tags", expression = "java(task.getTags().stream().map(com.CourseProject.MathApp.models.Tag::getName).collect(java.util.stream.Collectors.toSet()))")
    @Mapping(target = "owner", ignore = true)
    TaskDto toDto(Task task);

    @Mapping(target = "tags", expression = "java(task.getTags().stream().map(com.CourseProject.MathApp.models.Tag::getName).collect(java.util.stream.Collectors.toSet()))")
    @Mapping(target = "owner", ignore = true)
    List<TaskDto> toDtoList(List<Task> task);

    @Mapping(target = "tags", expression = "java(dto.getTags().stream().map(com.CourseProject.MathApp.models.Tag::new).collect(java.util.stream.Collectors.toSet()))")
    @Mapping(target = "id", ignore = true)
    Task fromDto(TaskDto dto);

}
