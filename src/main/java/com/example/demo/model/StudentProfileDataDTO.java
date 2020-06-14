package com.example.demo.model;

import com.example.demo.entity.Cours;
import com.example.demo.model.professorCoursClass.StudentResponseDTO;
import com.example.demo.model.response.StudentProfileResponseSemDTO;
import com.example.demo.model.response.TotalGradeFullResponse2DTO;

import java.util.List;


public class StudentProfileDataDTO {

    private TotalGradeFullResponse2DTO averages;
    private List<Cours> studentCourses;
    private StudentResponseDTO user;
    private ClassDTO clasa;

    public TotalGradeFullResponse2DTO getAverages() {
        return averages;
    }

    public void setAverages(TotalGradeFullResponse2DTO averages) {
        this.averages = averages;
    }

    public List<Cours> getStudentCourses() {
        return studentCourses;
    }

    public void setStudentCourses(List<Cours> studentCourses) {
        this.studentCourses = studentCourses;
    }

    public StudentResponseDTO getUser() {
        return user;
    }

    public void setUser(StudentResponseDTO user) {
        this.user = user;
    }

    public ClassDTO getClasa() {
        return clasa;
    }

    public void setClasa(ClassDTO clasa) {
        this.clasa = clasa;
    }
}
