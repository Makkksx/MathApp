package com.CourseProject.MathApp.service;

import com.CourseProject.MathApp.models.Role;
import com.CourseProject.MathApp.models.User;

import java.util.Optional;

public interface UserService {
    User saveUser(User user);
    Optional<User> findFirstByEmailAndProvider(String email, String clientName);
    Iterable<User> findAllByRole(Role role);
    Optional<User> findById(Long id);
    Optional<User> findFirstByUid(String uid);
}
