package com.CourseProject.MathApp.repo;


import com.CourseProject.MathApp.models.Role;
import com.CourseProject.MathApp.models.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UserRepository extends CrudRepository<User, Long> {
    User findFirstByEmailAndClientName(String email, String clientName);

    Iterable<User> findAllByRole(Role role);
}
