package com.example.demo.model.professorCoursClass;

public class StudentResponseDTO extends UserResponseDTO {

    private String registrationNumber;

    public String getRegistrationNumber() {
        return registrationNumber;
    }

    public void setRegistrationNumber(String registrationNumber) {
        this.registrationNumber = registrationNumber;
    }
}
