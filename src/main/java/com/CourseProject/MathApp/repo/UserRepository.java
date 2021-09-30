package com.CourseProject.MathApp.repo;


import com.CourseProject.MathApp.models.Role;
import com.CourseProject.MathApp.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findFirstByEmailAndProvider(String email, String clientName);
    List<User> findAllByRole(Role role);
    Optional<User> findFirstByUid(String uid);
}
