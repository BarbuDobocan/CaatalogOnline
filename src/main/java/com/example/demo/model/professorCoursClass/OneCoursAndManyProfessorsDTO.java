package com.example.demo.model.professorCoursClass;

import com.example.demo.entity.Cours;
import com.example.demo.entity.User;

import java.util.ArrayList;
import java.util.List;

public class OneCoursAndManyProfessorsDTO {
     private int id;
     private Cours cours;
     private List<UserResponseDTO> professors;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Cours getCours() {
        return cours;
    }

    public void setCours(Cours cours) {
        this.cours = cours;
    }

    public List<UserResponseDTO> getProfessors() {
        return professors;
    }

    public void setProfessors(List<User> professors) {
        List<UserResponseDTO> setProfessors = new ArrayList<UserResponseDTO>(0);
        for(User p : professors){
            UserResponseDTO user = new UserResponseDTO();
            user.setId(p.getId());
            user.setEmail(p.getEmail());
            user.setName(p.getFullName());
            user.setUserName(p.getUsername());
            setProfessors.add(user);
        }
        this.professors = setProfessors;
    }
}
