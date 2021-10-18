package com.CourseProject.MathApp.controllers;

import com.CourseProject.MathApp.mapper.UserMapper;
import com.CourseProject.MathApp.mapper.UserMapperImpl;
import com.CourseProject.MathApp.models.Role;
import com.CourseProject.MathApp.security.FirebaseService;
import com.CourseProject.MathApp.service.UserServiceImpl;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Objects;

@RestController
@RequestMapping("/admin")
@CrossOrigin
public class AdminController {
    private final FirebaseService firebaseService;
    private final UserServiceImpl userService;
    private final UserMapper userMapper = new UserMapperImpl();

    @Autowired
    public AdminController(UserServiceImpl userService, FirebaseService firebaseService) {
        this.userService = userService;
        this.firebaseService = firebaseService;
    }

    @GetMapping("/getAll")
    public ResponseEntity<?> getAllUsers(HttpServletRequest request) throws FirebaseAuthException {
        System.out.println("GetAll");
        try {
            FirebaseToken decodedToken = firebaseService.getDecodedToken(request);
            if (Boolean.TRUE.equals(decodedToken.getClaims().get("admin"))) {
                return new ResponseEntity<>(userService.findAllByRole(Role.USER), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
            }
        } catch (FirebaseAuthException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }


    }


    @GetMapping("/getProfile")
    public ResponseEntity<?> getLoginPage(@RequestParam(value = "uid") String uid, HttpServletRequest request) throws FirebaseAuthException {
        System.out.println("GetProfile");
        try {
            FirebaseToken decodedToken = firebaseService.getDecodedToken(request);
            if (Objects.equals(decodedToken.getUid(), uid) || Boolean.TRUE.equals(decodedToken.getClaims().get("admin"))) {
                return new ResponseEntity<>(userMapper.toDto(userService.findFirstByUid(uid).orElse(null)), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
            }
        } catch (FirebaseAuthException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

}
