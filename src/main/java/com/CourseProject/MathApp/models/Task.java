package com.CourseProject.MathApp.models;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@ToString
@Entity
@Table(name = "tasks_table")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @NotBlank
    private String title;
    @NotBlank
    private Theme theme;
    @NotBlank
    private String conditionURL;
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "tasks_tags",
            joinColumns = @JoinColumn(name = "task_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id")
    )
    private Set<Tag> tags;
    @ElementCollection
    @CollectionTable(name = "image_urls",
            joinColumns = @JoinColumn(name = "task_id"))
    private Set<String> images = new HashSet<>();
    @ElementCollection
    @CollectionTable(name = "answers",
            joinColumns = @JoinColumn(name = "task_id")
    )
    private Set<String> answers = new HashSet<>();
    @ManyToOne(fetch = FetchType.EAGER)
    private User owner;

    public Task(String title, Theme theme, String conditionURL, Set<Tag> tags, Set<String> images,
                Set<String> answers, User owner) {
        this.title = title;
        this.theme = theme;
        this.conditionURL = conditionURL;
        this.tags = tags;
        this.images = images;
        this.answers = answers;
        this.owner = owner;
    }

    public Task() {

    }

}
