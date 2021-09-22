package com.CourseProject.MathApp.models;

import lombok.Data;

import javax.persistence.*;

//@Data
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String username;
    private String email;
    private String clientName;
    private int solvedTasks;
    private int createdTasks;
    private Role role;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }


    public String getClientName() {
        return clientName;
    }

    public void setClientName(String clientName) {
        this.clientName = clientName;
    }

    public int getCreatedTasks() {
        return createdTasks;
    }

    public void setCreatedTasks(int createdTasks) {
        this.createdTasks = createdTasks;
    }

    public int getSolvedTasks() {
        return solvedTasks;
    }

    public void setSolvedTasks(int solvedTasks) {
        this.solvedTasks = solvedTasks;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}
