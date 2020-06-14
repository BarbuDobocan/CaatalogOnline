package com.example.demo.model;

import java.util.Date;

public class NewAbsenceForStudentDTO {

    private Date date;

    private int professorId;

    private int studentId;

    private int coursId;

    private boolean motivated;

    public NewAbsenceForStudentDTO() {
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public int getProfessorId() {
        return professorId;
    }

    public void setProfessorId(int professorId) {
        this.professorId = professorId;
    }

    public int getStudentId() {
        return studentId;
    }

    public void setStudentId(int studentId) {
        this.studentId = studentId;
    }

    public int getCoursId() {
        return coursId;
    }

    public void setCoursId(int coursId) {
        this.coursId = coursId;
    }

    public boolean isMotivated() {
        return motivated;
    }

    public void setMotivated(boolean motivated) {
        this.motivated = motivated;
    }
}
