package com.CourseProject.MathApp.payload;

import com.CourseProject.MathApp.models.Role;
import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Data
public class UserDto {
    private String id;
    @NotBlank
    private String uid;
    @NotBlank
    private String username;
    @NotBlank
    @Email
    private String email;
    @NotBlank
    private String provider;
    private int solvedTasks;
    private int createdTasks;
    private Role role;
}
