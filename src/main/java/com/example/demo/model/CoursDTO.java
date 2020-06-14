package com.example.demo.model;

public class CoursDTO {

    private String coursName;

    public CoursDTO() {
    }

    public CoursDTO(String coursName) {
        this.coursName = coursName;
    }

    public String getCoursName() {
        return coursName;
    }

    public void setCoursName(String coursName) {
        this.coursName = coursName;
    }
}
