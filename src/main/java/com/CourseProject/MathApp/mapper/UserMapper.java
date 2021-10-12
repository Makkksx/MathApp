package com.CourseProject.MathApp.mapper;

import com.CourseProject.MathApp.models.User;
import com.CourseProject.MathApp.payload.UserDto;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper
public interface UserMapper {
    UserDto toDto(User user);

    List<UserDto> toDtoList(List<User> user);
}
