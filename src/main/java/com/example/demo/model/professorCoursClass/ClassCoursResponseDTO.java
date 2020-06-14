package com.example.demo.model.professorCoursClass;

import com.example.demo.entity.Cours;
import com.example.demo.model.response.ClassResponseDTO;

public class ClassCoursResponseDTO {
    private ClassResponseDTO clasa;
    private Cours cours;

    public ClassResponseDTO getClasa() {
        return clasa;
    }

    public void setClasa(ClassResponseDTO clasa) {
        this.clasa = clasa;
    }

    public Cours getCours() {
        return cours;
    }

    public void setCours(Cours cours) {
        this.cours = cours;
    }
}
