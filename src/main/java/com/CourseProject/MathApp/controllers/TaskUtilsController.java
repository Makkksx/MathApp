package com.CourseProject.MathApp.controllers;

import com.CourseProject.MathApp.models.Task;
import com.CourseProject.MathApp.models.Theme;
import com.CourseProject.MathApp.models.User;
import com.CourseProject.MathApp.security.FirebaseService;
import com.CourseProject.MathApp.service.TagServiceImpl;
import com.CourseProject.MathApp.service.TaskServiceImpl;
import com.CourseProject.MathApp.service.UserServiceImpl;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/task/utils")
@CrossOrigin
public class TaskUtilsController {
    private final FirebaseService firebaseService;
    private final TaskServiceImpl taskService;
    private final UserServiceImpl userService;
    private final TagServiceImpl tagService;

    @Autowired
    public TaskUtilsController(FirebaseService firebaseService, TaskServiceImpl taskService, UserServiceImpl userService, TagServiceImpl tagService) {
        this.firebaseService = firebaseService;
        this.taskService = taskService;
        this.userService = userService;
        this.tagService = tagService;
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
    public ResponseEntity<?> getTags() {
        System.out.println("getAllTags");
        return new ResponseEntity<>(tagService.getAllTags(), HttpStatus.OK);

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

    @PostMapping("/currentAnswer")
    public ResponseEntity<?> currentAnswer(@RequestBody Long taskId, HttpServletRequest request) throws FirebaseAuthException {
        System.out.println("currentAnswer");
        try {
            FirebaseToken decodedToken = firebaseService.getDecodedToken(request);
            User user = userService.findFirstByUid(decodedToken.getUid()).orElse(null);
            if (user != null) {
                user.addCurrentTask(taskId);
                user.incSolvedTasks();
                userService.saveUser(user);
                return new ResponseEntity<>(HttpStatus.OK);
            }
        } catch (FirebaseAuthException e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @GetMapping("/checkSolvedTask")
    public ResponseEntity<?> checkAnswer(@RequestParam(value = "taskId") String taskId, HttpServletRequest request) {
        System.out.println("checkSolvedTask");
        try {
            FirebaseToken decodedToken = firebaseService.getDecodedToken(request);
            User user = userService.findFirstByUid(decodedToken.getUid()).orElse(null);
            if (user != null) {
                return new ResponseEntity<>(user.checkCurrentTask(Long.valueOf(taskId)), HttpStatus.OK);
            }
        } catch (FirebaseAuthException e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @PostMapping("/addRating")
    public ResponseEntity<?> addRating(@RequestParam(value = "taskId") String taskId,
                                       @RequestParam(value = "rating") String rating,
                                       HttpServletRequest request) throws FirebaseAuthException {
        System.out.println("addRating");
        try {
            FirebaseToken decodedToken = firebaseService.getDecodedToken(request);
            Task task = taskService.findTaskById(Long.valueOf(taskId)).orElse(null);
            User user = userService.findFirstByUid(decodedToken.getUid()).orElse(null);
            if (task == null) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            } else if (user != null) {
                task.addRating(Integer.parseInt(rating));
                user.AddRatedTask(Long.valueOf(taskId));
                userService.saveUser(user);
                taskService.saveTask(task);
                return new ResponseEntity<>(HttpStatus.OK);
            }
        } catch (FirebaseAuthException e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @GetMapping("/checkTaskRated")
    public ResponseEntity<?> checkRated(@RequestParam(value = "taskId") String taskId, HttpServletRequest request) {
        System.out.println("checkTaskRated");
        try {
            FirebaseToken decodedToken = firebaseService.getDecodedToken(request);
            User user = userService.findFirstByUid(decodedToken.getUid()).orElse(null);
            if (user != null) {
                return new ResponseEntity<>(user.checkTaskRated(Long.valueOf(taskId)), HttpStatus.OK);
            }
        } catch (FirebaseAuthException e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }
}
