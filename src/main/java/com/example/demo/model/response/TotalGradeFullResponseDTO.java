package com.example.demo.model.response;

import java.util.List;

public class TotalGradeFullResponseDTO {
    private TotalGradeResponseDTO average;
    private List<TotalGradeResponseDTO> grades;

    public TotalGradeResponseDTO getAverage() {
        return average;
    }

    public void setAverage(TotalGradeResponseDTO average) {
        this.average = average;
    }

    public List<TotalGradeResponseDTO> getGrades() {
        return grades;
    }

    public void setGrades(List<TotalGradeResponseDTO> grades) {
        this.grades = grades;
    }
}
