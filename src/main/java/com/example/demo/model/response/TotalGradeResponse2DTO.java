package com.example.demo.model.response;

import com.example.demo.entity.Cours;

public class TotalGradeResponse2DTO {
    private Cours cours;
    private TotalGradeResponseDTO semI;
    private TotalGradeResponseDTO semII;
    private TotalGradeResponseDTO yearFinal;


    public Cours getCours() {
        return cours;
    }

    public void setCours(Cours cours) {
        this.cours = cours;
    }

    public TotalGradeResponseDTO getSemI() {
        return semI;
    }

    public void setSemI(TotalGradeResponseDTO semI) {
        this.semI = semI;
    }

    public TotalGradeResponseDTO getSemII() {
        return semII;
    }

    public void setSemII(TotalGradeResponseDTO semII) {
        this.semII = semII;
    }

    public TotalGradeResponseDTO getYearFinal() {
        return yearFinal;
    }

    public void setYearFinal(TotalGradeResponseDTO yearFinal) {
        this.yearFinal = yearFinal;
    }

}
