package com.example.demo.model.professorCoursClass;

import java.util.List;

public class ClassFullResponseDTO {
    private int id;
    private int year;
    private String name;
    private List<StudentResponseDTO> students;
    private List<ProfessorCoursResponseDTO> courses;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<StudentResponseDTO> getStudents() {
        return students;
    }

    public void setStudents(List<StudentResponseDTO> students) {
        this.students = students;
    }

    public List<ProfessorCoursResponseDTO> getCourses() {
        return courses;
    }

    public void setCourses(List<ProfessorCoursResponseDTO> courses) {
        this.courses = courses;
    }
}
