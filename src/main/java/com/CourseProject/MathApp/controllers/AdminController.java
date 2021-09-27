package com.CourseProject.MathApp.controllers;

import com.CourseProject.MathApp.models.Role;
import com.CourseProject.MathApp.models.User;
import com.CourseProject.MathApp.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/admin")
@CrossOrigin
public class AdminController {
    //    @Autowired
//    private UserRepository userRepository;
    @Autowired
    private UserServiceImpl userService;

    //    @GetMapping("/admin")
//    public String tableMain(Model model, Authentication auth) {
//        if (auth.getAuthorities().contains(Role.USER)) {
//            return "redirect:/";
//        }
//        model.addAttribute("users", userService.findAllByRole(Role.USER));
//        model.addAttribute("title", "Admin page");
//        return "admin";
//    }
    @GetMapping("/getAll")
    public List<User> getAllUsers() {
        return userService.findAllByRole(Role.USER);
    }

}
