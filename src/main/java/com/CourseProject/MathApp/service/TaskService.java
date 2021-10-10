package com.CourseProject.MathApp.service;

import com.CourseProject.MathApp.models.Task;
import com.CourseProject.MathApp.payload.TaskDto;

import java.util.List;

public interface TaskService {
    Task saveTask(Task task);
    List<TaskDto> getAllTasks();
}
