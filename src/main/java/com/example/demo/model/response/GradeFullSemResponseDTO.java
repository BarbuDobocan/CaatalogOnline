package com.example.demo.model.response;

public class GradeFullSemResponseDTO {
    private TotalGradeFullResponseDTO semI;
    private TotalGradeFullResponseDTO semII;
    private TotalGradeFullResponseDTO yearFinal;

    public TotalGradeFullResponseDTO getSemI() {
        return semI;
    }

    public void setSemI(TotalGradeFullResponseDTO semI) {
        this.semI = semI;
    }

    public TotalGradeFullResponseDTO getSemII() {
        return semII;
    }

    public void setSemII(TotalGradeFullResponseDTO semII) {
        this.semII = semII;
    }

    public TotalGradeFullResponseDTO getYearFinal() {
        return yearFinal;
    }

    public void setYearFinal(TotalGradeFullResponseDTO yearFinal) {
        this.yearFinal = yearFinal;
    }
}
