package com.example.demo.model;

import java.util.List;

public class TransfStudentDataDTO {
    private int studentId;
    private int classId;
    private List<GradeCoursDTO> finals;

    public int getStudentId() {
        return studentId;
    }

    public void setStudentId(int studentId) {
        this.studentId = studentId;
    }

    public int getClassId() {
        return classId;
    }

    public void setClassId(int classId) {
        this.classId = classId;
    }

    public List<GradeCoursDTO> getFinals() {
        return finals;
    }

    public void setFinals(List<GradeCoursDTO> finals) {
        this.finals = finals;
    }
}
