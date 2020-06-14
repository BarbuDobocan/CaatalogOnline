package com.example.demo.model.response;

import com.example.demo.model.professorCoursClass.UserResponseDTO;

import java.util.List;

public class ParentProfileResponseDTO {
    private UserResponseDTO user;
    private List<UserResponseDTO> kids;

    public UserResponseDTO getUser() {
        return user;
    }

    public void setUser(UserResponseDTO user) {
        this.user = user;
    }

    public List<UserResponseDTO> getKids() {
        return kids;
    }

    public void setKids(List<UserResponseDTO> kids) {
        this.kids = kids;
    }
}
