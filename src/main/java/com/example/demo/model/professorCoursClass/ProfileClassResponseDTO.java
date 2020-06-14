package com.example.demo.model.professorCoursClass;

import com.example.demo.model.response.ClassResponseDTO;

import java.util.List;

public class ProfileClassResponseDTO {
    private List<StudentResponseDTO> students;
    private List<ProfessorCoursResponseDTO> courses;
    private UserResponseDTO masterOfClass;
    private ClassResponseDTO clasa;

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

    public UserResponseDTO getMasterOfClass() {
        return masterOfClass;
    }

    public void setMasterOfClass(UserResponseDTO masterOfClass) {
        this.masterOfClass = masterOfClass;
    }

    public ClassResponseDTO getClasa() {
        return clasa;
    }

    public void setClasa(ClassResponseDTO clasa) {
        this.clasa = clasa;
    }
}
