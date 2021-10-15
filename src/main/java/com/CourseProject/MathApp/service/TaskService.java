package com.CourseProject.MathApp.service;

import com.CourseProject.MathApp.models.Task;
import com.CourseProject.MathApp.payload.TaskDto;

import java.util.List;
import java.util.Optional;

public interface TaskService {
    void saveTask(Task task);

    TaskDto findById(Long id);

    Optional<Task> findTaskById(Long id);

    List<TaskDto> getAllTasks();
}
