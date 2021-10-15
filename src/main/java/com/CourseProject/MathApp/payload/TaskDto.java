package com.CourseProject.MathApp.payload;

import com.CourseProject.MathApp.models.User;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import java.util.Set;

@Data
public class TaskDto {
    private Long id;
    @NotBlank
    private String title;
    @NotBlank
    private String theme;
    @NotBlank
    private String conditionURL;
    @NotBlank
    private Set<String> tags;
    @NotBlank
    private Set<String> images;
    @NotBlank
    private Set<String> answers;
    private User owner;
    @NotBlank
    private float rating;

}
