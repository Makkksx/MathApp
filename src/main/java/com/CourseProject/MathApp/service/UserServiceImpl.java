package com.CourseProject.MathApp.service;

import com.CourseProject.MathApp.mapper.UserMapper;
import com.CourseProject.MathApp.mapper.UserMapperImpl;
import com.CourseProject.MathApp.models.Role;
import com.CourseProject.MathApp.models.User;
import com.CourseProject.MathApp.payload.UserDto;
import com.CourseProject.MathApp.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper = new UserMapperImpl();

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public Optional<User> findFirstByEmailAndProvider(String email, String clientName) {
        return userRepository.findFirstByEmailAndProvider(email, clientName);
    }

    @Override
    public List<UserDto> findAllByRole(Role role) {
        return userMapper.toDtoList(userRepository.findAllByRole(role));
    }

    @Override
    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public Optional<User> findFirstByUid(String uid) {
        return userRepository.findFirstByUid(uid);
    }
}
