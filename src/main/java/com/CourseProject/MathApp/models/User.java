package com.CourseProject.MathApp.models;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Getter
@Setter
@ToString
@Entity
@Table(name = "users_table")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
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

    public User(String uid, String username, String email, String provider) {
        this.uid = uid;
        this.username = username;
        this.email = email;
        this.provider = provider;
        this.solvedTasks = 0;
        this.createdTasks = 0;
        this.role = Role.USER;
    }

    public User() {

    }
}
