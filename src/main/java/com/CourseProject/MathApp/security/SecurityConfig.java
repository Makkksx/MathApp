package com.CourseProject.MathApp.security;

import com.CourseProject.MathApp.models.Role;
import com.CourseProject.MathApp.security.OAuth2.CustomOAuth2UserService;
import com.CourseProject.MathApp.security.OAuth2.OAuth2LoginSuccessHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private CustomOAuth2UserService oAuth2UserService;
    @Autowired
    private OAuth2LoginSuccessHandler oAuth2LoginSuccessHandler;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .authorizeRequests()
                .antMatchers("/", "/login").permitAll()
//                .antMatchers("/admin").hasAuthority("ROLE_ADMIN")
                .anyRequest().authenticated()
                .and()
                .oauth2Login()
                    .loginPage("/login")
                    .defaultSuccessUrl("/table")
                    .userInfoEndpoint()
                    .userService(oAuth2UserService)
                    .and()
                    .successHandler(oAuth2LoginSuccessHandler)
                .and()
                    .logout().permitAll();
    }
}
