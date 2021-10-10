package com.CourseProject.MathApp.service;

import com.CourseProject.MathApp.mapper.TaskMapper;
import com.CourseProject.MathApp.mapper.TaskMapperImpl;
import com.CourseProject.MathApp.models.Tag;
import com.CourseProject.MathApp.models.Task;
import com.CourseProject.MathApp.payload.TaskDto;
import com.CourseProject.MathApp.repo.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class TaskServiceImpl implements TaskService {

    private final TaskMapper mapper = new TaskMapperImpl();
    private final TaskRepository taskRepository;
    private final TagServiceImpl tagService;
    @Autowired
    public TaskServiceImpl(TaskRepository taskRepository, TagServiceImpl tagService) {
        this.taskRepository = taskRepository;
        this.tagService = tagService;
    }

    @Override
    public Task saveTask(Task task) {
        List<Tag> tags = tagService.saveTags(task.getTags());
        task.setTags(new HashSet<>(tags));
        return taskRepository.save(task);
    }

    @Override
    public List<TaskDto> getAllTasks() {
        List<TaskDto> taskDTOList = new ArrayList<>();
        List<Task> taskList = taskRepository.findAll();
        for (Task task : taskList) {
            taskDTOList.add(mapper.toDto(task));
        }
        return taskDTOList;
    }
}
