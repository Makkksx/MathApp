package com.CourseProject.MathApp.payload;

import lombok.Data;

import javax.validation.constraints.NotBlank;
@Data
public class TagDto {
    @NotBlank
    private String value;
    @NotBlank
    private int count;

    public TagDto(String value, int count) {
        this.value = value;
        this.count = count;
    }
}
