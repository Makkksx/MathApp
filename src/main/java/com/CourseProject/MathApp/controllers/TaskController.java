package com.CourseProject.MathApp.controllers;

import com.CourseProject.MathApp.mapper.TaskMapper;
import com.CourseProject.MathApp.mapper.TaskMapperImpl;
import com.CourseProject.MathApp.models.Task;
import com.CourseProject.MathApp.models.Theme;
import com.CourseProject.MathApp.models.User;
import com.CourseProject.MathApp.payload.TaskDto;
import com.CourseProject.MathApp.security.FirebaseService;
import com.CourseProject.MathApp.service.TagServiceImpl;
import com.CourseProject.MathApp.service.TaskServiceImpl;
import com.CourseProject.MathApp.service.UserServiceImpl;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

@RestController
@RequestMapping("/task")
@CrossOrigin
public class TaskController {
    private final FirebaseService firebaseService;
    private final TaskMapper mapper = new TaskMapperImpl();
    private final TaskServiceImpl taskService;
    private final UserServiceImpl userService;
    private final TagServiceImpl tagService;

    @Autowired
    public TaskController(FirebaseService firebaseService, TaskServiceImpl taskService, UserServiceImpl userService, TagServiceImpl tagService) {
        this.firebaseService = firebaseService;
        this.taskService = taskService;
        this.userService = userService;
        this.tagService = tagService;
    }

    @PostMapping("/create")
    public ResponseEntity<?> createTask(@Valid @RequestBody TaskDto taskDto, HttpServletRequest request, BindingResult bindingResult)
            throws FirebaseAuthException {
        System.out.println("createTask");
        if (bindingResult.hasErrors()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        try {
            FirebaseToken decodedToken = firebaseService.getDecodedToken(request);
            User user = userService.findFirstByUid(decodedToken.getUid()).orElse(null);
            if (user == null) {
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            } else {
                user.setCreatedTasks(user.getCreatedTasks() + 1);
                taskDto.setOwner(user);
                System.out.println(taskDto.getTags());
                Task task = mapper.fromDto(taskDto);
                System.out.println(task.toString());
                userService.saveUser(user);
                taskService.saveTask(task);
                return new ResponseEntity<>(HttpStatus.OK);
            }
        } catch (FirebaseAuthException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("/getAllTasks")
    public ResponseEntity<?> getTasks(HttpServletRequest request) throws FirebaseAuthException {
        System.out.println("getAllTasks");
        try {
            firebaseService.getDecodedToken(request);
            return new ResponseEntity<>(taskService.getAllTasks(), HttpStatus.OK);
        } catch (FirebaseAuthException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("/getAllTagNames")
    public ResponseEntity<?> getTagNames(HttpServletRequest request) throws FirebaseAuthException {
        System.out.println("getAllTagNames");
        try {
            firebaseService.getDecodedToken(request);
            return new ResponseEntity<>(tagService.getAllTagNames(), HttpStatus.OK);
        } catch (FirebaseAuthException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("/getAllTags")
    public ResponseEntity<?> getTags(HttpServletRequest request) throws FirebaseAuthException {
        System.out.println("getAllTags");
        try {
            firebaseService.getDecodedToken(request);
            return new ResponseEntity<>(tagService.getAllTags(), HttpStatus.OK);
        } catch (FirebaseAuthException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("/getAllThemes")
    public ResponseEntity<?> getThemes(HttpServletRequest request) throws FirebaseAuthException {
        System.out.println("getThemes");
        try {
            firebaseService.getDecodedToken(request);
            return new ResponseEntity<>(Theme.values(), HttpStatus.OK);
        } catch (FirebaseAuthException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

}
