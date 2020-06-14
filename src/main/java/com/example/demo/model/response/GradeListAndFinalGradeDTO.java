package com.example.demo.model.response;

import com.example.demo.entity.grades.FinalGradeCours;

import java.util.List;

public class GradeListAndFinalGradeDTO {
    private List<GradeListResponseDTO> studentGradesResponse = null;
    private FinalGradeCours finalGradeCours = null;
    private List<GradeListResponseDTO> thesis = null;
    private boolean canFinalGradeBeDeleted = true;

    public List<GradeListResponseDTO> getStudentGradesResponse() {
        return studentGradesResponse;
    }

    public void setStudentGradesResponse(List<GradeListResponseDTO> studentGradesResponse) {
        this.studentGradesResponse = studentGradesResponse;
    }

    public FinalGradeCours getFinalGradeCours() {
        return finalGradeCours;
    }

    public void setFinalGradeCours(FinalGradeCours finalGradeCours) {
        this.finalGradeCours = finalGradeCours;
    }

    public List<GradeListResponseDTO> getThesis() {
        return thesis;
    }

    public void setThesis(List<GradeListResponseDTO> thesis) {
        this.thesis = thesis;
    }

    public boolean isCanFinalGradeBeDeleted() {
        return canFinalGradeBeDeleted;
    }

    public void setCanFinalGradeBeDeleted(boolean canFinalGradeBeDeleted) {
        this.canFinalGradeBeDeleted = canFinalGradeBeDeleted;
    }
}
