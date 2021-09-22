package com.CourseProject.MathApp.security.OAuth2;

import com.CourseProject.MathApp.models.Role;
import com.CourseProject.MathApp.models.User;
import com.CourseProject.MathApp.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collections;

@Component
public class OAuth2LoginSuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler {
    @Autowired
    private UserRepository userRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws ServletException, IOException {
        CustomOAuth2User oAuth2User = (CustomOAuth2User) authentication.getPrincipal();
        User user = userRepository.findFirstByEmailAndClientName(oAuth2User.getEmail(),
                oAuth2User.getClientName());
        if (user == null) {
            user = new User();
            user.setUsername(oAuth2User.getName());
            user.setClientName(oAuth2User.getClientName());
            user.setEmail(oAuth2User.getEmail());
            user.setRole(Role.USER);
        }
        userRepository.save(user);
        SecurityContextHolder.getContext().setAuthentication(
                new UsernamePasswordAuthenticationToken(
                        SecurityContextHolder.getContext().getAuthentication().getPrincipal(),
                        SecurityContextHolder.getContext().getAuthentication().getCredentials(),
                        Collections.singleton(user.getRole())
                ));
        super.onAuthenticationSuccess(request, response, authentication);
    }
}
