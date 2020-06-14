package com.example.demo.model.response;

import java.util.List;

public class StudentProfileResponseSemDTO {
    private List<AbsenceResponseDTO> absences;
    private List<GradeListResponseDTO> grades;
    private List<GradeListResponseDTO> thesis;

    public List<AbsenceResponseDTO> getAbsences() {
        return absences;
    }

    public void setAbsences(List<AbsenceResponseDTO> absences) {
        this.absences = absences;
    }

    public List<GradeListResponseDTO> getGrades() {
        return grades;
    }

    public void setGrades(List<GradeListResponseDTO> grades) {
        this.grades = grades;
    }

    public List<GradeListResponseDTO> getThesis() {
        return thesis;
    }

    public void setThesis(List<GradeListResponseDTO> thesis) {
        this.thesis = thesis;
    }
}
