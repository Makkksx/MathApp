package com.CourseProject.MathApp.controllers;

import com.CourseProject.MathApp.models.Role;
import com.CourseProject.MathApp.models.User;
import com.CourseProject.MathApp.payload.LoginRequest;
import com.CourseProject.MathApp.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDateTime;

@CrossOrigin
@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private UserServiceImpl userService;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        User user = userService.findFirstByEmailAndProvider(loginRequest.getEmail(),
                loginRequest.getProvider());
        if (user == null) {
            user = new User();
            user.setUsername(loginRequest.getName());
            user.setProvider(loginRequest.getProvider());
            user.setEmail(loginRequest.getEmail());
            user.setCreatedTasks(0);
            user.setSolvedTasks(0);
            user.setRole(Role.USER);
        }
        userService.saveUser(user);
        return new ResponseEntity<>(HttpStatus.OK);
    }


}
