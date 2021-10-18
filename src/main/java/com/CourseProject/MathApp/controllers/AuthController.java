package com.CourseProject.MathApp.controllers;

import com.CourseProject.MathApp.models.User;
import com.CourseProject.MathApp.security.FirebaseService;
import com.CourseProject.MathApp.service.UserServiceImpl;
import com.google.api.client.util.ArrayMap;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@CrossOrigin
@RestController
@RequestMapping("/auth")
public class AuthController {
    private final FirebaseService firebaseService;
    private final UserServiceImpl userService;

    @Autowired
    public AuthController(FirebaseService firebaseService, UserServiceImpl userService) {
        this.firebaseService = firebaseService;
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(HttpServletRequest request) throws FirebaseAuthException {
        System.out.println("Login");
        try {
            FirebaseToken decodedToken = firebaseService.getDecodedToken(request);
            if (!userService.findFirstByUid(decodedToken.getUid()).isPresent()) {
                String provider = (String) ((ArrayMap<?, ?>) decodedToken.getClaims().get("firebase")).get("sign_in_provider");
                User user = new User(
                        decodedToken.getUid(),
                        decodedToken.getName(),
                        decodedToken.getEmail(),
                        provider);
                userService.saveUser(user);
            }
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (FirebaseAuthException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("/getDarkMode")
    public ResponseEntity<?> getMode(HttpServletRequest request) {
        System.out.println("getDarkMode");
        try {
            FirebaseToken decodedToken = firebaseService.getDecodedToken(request);
            User user = userService.findFirstByUid(decodedToken.getUid()).orElse(null);
            if (user != null) {
                return new ResponseEntity<>(user.isDarkMode(), HttpStatus.OK);
            }
        } catch (FirebaseAuthException e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @PostMapping("/changeDarkMode")
    public ResponseEntity<?> changeMode(HttpServletRequest request) {
        System.out.println("changeDarkMode");
        try {
            FirebaseToken decodedToken = firebaseService.getDecodedToken(request);
            User user = userService.findFirstByUid(decodedToken.getUid()).orElse(null);
            if (user != null) {
                user.changeDarkMode();
                userService.saveUser(user);
                return new ResponseEntity<>(HttpStatus.OK);
            }
        } catch (FirebaseAuthException e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

}