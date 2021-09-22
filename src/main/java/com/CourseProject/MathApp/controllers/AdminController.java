package com.CourseProject.MathApp.controllers;

import com.CourseProject.MathApp.models.Role;
import com.CourseProject.MathApp.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AdminController {
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/admin")
    public String tableMain(Model model, Authentication auth) {
        if (auth.getAuthorities().contains(Role.USER)) {
            return "redirect:/";
        }
        model.addAttribute("users", userRepository.findAllByRole(Role.USER));
        model.addAttribute("title", "Admin page");
        return "admin";
    }

}
