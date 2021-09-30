package com.CourseProject.MathApp.controllers;

import com.CourseProject.MathApp.models.User;
import com.CourseProject.MathApp.service.UserServiceImpl;
import com.google.api.client.util.ArrayMap;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserServiceImpl userService;
    @Autowired
    public AuthController(UserServiceImpl userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(HttpServletRequest request) throws FirebaseAuthException {
        FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(request.getHeader("idToken"));
        String provider = (String) ((ArrayMap<?,?>) decodedToken.getClaims().get("firebase")).get("sign_in_provider");
        User user = userService.findFirstByUid(decodedToken.getUid())
                .orElse(new User(
                        decodedToken.getUid(),
                        decodedToken.getName(),
                        decodedToken.getEmail(),
                        provider
                ));
        userService.saveUser(user);

        return new ResponseEntity<>(HttpStatus.OK);
    }


}
