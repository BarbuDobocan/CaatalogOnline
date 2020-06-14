package com.example.demo.model.professorCoursClass;

import com.example.demo.entity.Cours;

public class ProfessorCoursResponseDTO {

    private UserResponseDTO professor;

    private Cours cours;

    public UserResponseDTO getProfessor() {
        return professor;
    }

    public void setProfessor(UserResponseDTO professor) {
        this.professor = professor;
    }

    public Cours getCours() {
        return cours;
    }

    public void setCours(Cours cours) {
        this.cours = cours;
    }
}
