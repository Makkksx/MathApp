package com.CourseProject.MathApp.service;

import com.CourseProject.MathApp.models.Role;
import com.CourseProject.MathApp.models.User;

public interface UserService {
    User saveUser(User user);
    User findFirstByEmailAndProvider(String email, String clientName);
    Iterable<User> findAllByRole(Role role);
}
