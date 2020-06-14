package com.example.demo.model;

import com.example.demo.entity.Role;
import com.example.demo.entity.User;

import java.util.HashSet;
import java.util.Set;

public class JwtAuthenticationResponse {
    private String username;
    private Set<Role> roles = new HashSet<>(0);
    private User user;
    private String accessToken;
    private final String tokenType = "Bearer";

    public JwtAuthenticationResponse(String accessToken){
        this.accessToken = accessToken;
    }

    public JwtAuthenticationResponse(String accessToken, User user) {
        this.accessToken = accessToken;
        this.user = user;
    }

    public JwtAuthenticationResponse(String accessToken, String username, Set<Role> roles) {
        this.username = username;
        this.roles = roles;
        this.accessToken = accessToken;
    }

    public String getAccessToken() {
        System.out.println(2);
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getTokenType() {
        return tokenType;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
