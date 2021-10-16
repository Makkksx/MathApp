package com.CourseProject.MathApp.models;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
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
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "owner")
    private Set<Task> tasks;
    @ElementCollection
    @CollectionTable(name = "user_current_tasks",
            joinColumns = @JoinColumn(name = "user_id")
    )
    private Set<Long> currentTasks = new HashSet<>();
    @ElementCollection
    @CollectionTable(name = "user_rated_tasks",
            joinColumns = @JoinColumn(name = "user_id")
    )
    private Set<Long> ratedTasks = new HashSet<>();
    private boolean darkMode = false;
    public void changeDarkMode(){
        this.darkMode = !this.darkMode;
    }
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

    public void addCurrentTask(Long taskId) {
        currentTasks.add(taskId);
    }

    public void AddRatedTask(Long taskId) {
        ratedTasks.add(taskId);
    }

    public void incSolvedTasks() {
        this.solvedTasks++;
    }

    public void incCreatedTasks() {
        this.createdTasks++;
    }

    public boolean checkCurrentTask(Long taskId) {
        return currentTasks.contains(taskId);
    }

    public boolean checkTaskRated(Long taskId) {
        return ratedTasks.contains(taskId);
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", uid='" + uid + '\'' +
                ", username='" + username + '\'' +
                ", email='" + email + '\'' +
                ", provider='" + provider + '\'' +
                ", solvedTasks=" + solvedTasks +
                ", createdTasks=" + createdTasks +
                ", role=" + role +
                '}';
    }

}
