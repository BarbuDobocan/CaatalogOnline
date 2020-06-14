package com.example.demo.entity.grades;

import com.example.demo.entity.Cours;
import com.example.demo.entity.User;

import javax.persistence.*;

@Entity
public class TotalGrade {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @OneToOne
    @JoinColumn(name="student_id")
    private User student;

    @OneToOne
    @JoinColumn(name="professor_id")
    private User professor;

    private double totalGradeI;

    private int year;

    private int semester;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public User getStudent() {
        return student;
    }

    public void setStudent(User student) {
        this.student = student;
    }


    public User getProfessor() {
        return professor;
    }

    public void setProfessor(User professor) {
        this.professor = professor;
    }

    public double getTotalGradeI() {
        return totalGradeI;
    }

    public void setTotalGradeI(double totalGradeI) {
        this.totalGradeI = totalGradeI;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public int getSemester() {
        return semester;
    }

    public void setSemester(int semester) {
        this.semester = semester;
    }
}
