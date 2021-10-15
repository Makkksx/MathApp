package com.CourseProject.MathApp.models;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "tags_table")
public class Tag {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @NotBlank
    private String name;
    @NotBlank
    private int count = 0;
    @ManyToMany(mappedBy = "tags")
    private Set<Task> tasks;

    public Tag(String name) {
        this.name = name;
    }

    public Tag() {

    }

    public void incCount() {
        this.count++;
    }

    @Override
    public String toString() {
        return name;
    }


}
