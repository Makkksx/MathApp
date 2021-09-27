package com.CourseProject.MathApp.service;

import com.CourseProject.MathApp.models.Role;
import com.CourseProject.MathApp.models.User;
import com.CourseProject.MathApp.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService{
    @Autowired
    private UserRepository userRepository;
    @Override
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public User findFirstByEmailAndProvider(String email, String clientName) {
        return userRepository.findFirstByEmailAndProvider(email,clientName);
    }

    @Override
    public List<User> findAllByRole(Role role) {
        return userRepository.findAllByRole(role);
    }
}
