package com.CourseProject.MathApp.controllers;

import com.CourseProject.MathApp.models.User;
import com.CourseProject.MathApp.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class MainController {

    //    @GetMapping("/")
//    public String home(Model model) {
//        model.addAttribute("title", "Start page");
//        return "home";
//    }
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/users")
    public List<User> home(Model model) {
        model.addAttribute("title", "Start page");
        return userRepository.findAll();
//        return "home";
    }


//    @GetMapping("/login")
//    public String getLoginPage(Model model,
//                               @RequestParam(value = "error", required = false) String error,
//                               @RequestParam(value = "logout", required = false) String logout) {
//        model.addAttribute("error", error != null);
//        model.addAttribute("logout", logout != null);
//        return "login";
//    }
}
