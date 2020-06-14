package com.example.demo.entity.grades;

import com.example.demo.entity.Cours;
import com.example.demo.entity.User;

import javax.persistence.*;

@Entity
public class FinalGradeCours {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @OneToOne
    @JoinColumn(name="student_id")
    private User student;

    @OneToOne
    @JoinColumn(name="cours_id")
    private Cours cours;

    @OneToOne
    @JoinColumn(name="professor_id")
    private User professor;

    private int year;

    private double grade;

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

    public Cours getCours() {
        return cours;
    }

    public void setCours(Cours cours) {
        this.cours = cours;
    }

    public User getProfessor() {
        return professor;
    }

    public void setProfessor(User professor) {
        this.professor = professor;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public double getGrade() {
        return grade;
    }

    public void setGrade(double grade) {
        this.grade = grade;
    }

    public int getSemester() {
        return semester;
    }

    public void setSemester(int semester) {
        this.semester = semester;
    }
}
