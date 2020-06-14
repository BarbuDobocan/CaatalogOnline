package com.example.demo.model.response;

import java.util.Date;

public class AbsenceResponseDTO {
    private int id;
    private String professorName;
    private String studentName;
    private String coursName;
    private Date date;
    private int semester;
    private boolean motivated;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getProfessorName() {
        return professorName;
    }

    public void setProfessorName(String professorName) {
        this.professorName = professorName;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public String getCoursName() {
        return coursName;
    }

    public void setCoursName(String coursName) {
        this.coursName = coursName;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public boolean isMotivated() {
        return motivated;
    }

    public int getSemester() {
        return semester;
    }

    public void setSemester(int semester) {
        this.semester = semester;
    }

    public void setMotivated(boolean motivated) {
        this.motivated = motivated;
    }
}
