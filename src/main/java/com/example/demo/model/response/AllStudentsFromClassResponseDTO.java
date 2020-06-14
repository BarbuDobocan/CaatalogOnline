package com.example.demo.model.response;

import com.example.demo.entity.Cours;
import com.example.demo.model.professorCoursClass.StudentResponseDTO;

import java.util.List;


public class AllStudentsFromClassResponseDTO {
    private List<StudentResponseDTO> students;
    private List<Cours> commonCours;

    public List<StudentResponseDTO> getStudents() {
        return students;
    }

    public void setStudents(List<StudentResponseDTO> students) {
        this.students = students;
    }

    public List<Cours> getCommonCours() {
        return commonCours;
    }

    public void setCommonCours(List<Cours> commonCours) {
        this.commonCours = commonCours;
    }
}
