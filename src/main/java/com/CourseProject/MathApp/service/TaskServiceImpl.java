package com.CourseProject.MathApp.service;

import com.CourseProject.MathApp.mapper.TaskMapper;
import com.CourseProject.MathApp.mapper.TaskMapperImpl;
import com.CourseProject.MathApp.models.Task;
import com.CourseProject.MathApp.payload.TaskDto;
import com.CourseProject.MathApp.repo.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskServiceImpl implements TaskService {

    private final TaskMapper mapper = new TaskMapperImpl();
    private final TaskRepository taskRepository;

    @Autowired
    public TaskServiceImpl(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @Override
    public void saveTask(Task task) {
        taskRepository.save(task);
    }

    @Override
    public TaskDto findById(Long id) {
        return mapper.toDto(taskRepository.findById(id).orElse(null));
    }

    @Override
    public Optional<Task> findTaskById(Long id) {
        return taskRepository.findById(id);
    }

    @Override
    public List<TaskDto> getAllTasks() {
        return mapper.toDtoList(taskRepository.findAll());
    }
}
