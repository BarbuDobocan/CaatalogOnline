package com.example.demo.model;

import com.example.demo.entity.Class;
import com.example.demo.entity.Cours;
import com.example.demo.model.professorCoursClass.ClassCoursResponseDTO;
import com.example.demo.model.professorCoursClass.UserResponseDTO;
import com.example.demo.model.response.ClassResponseDTO;

import java.util.List;
import java.util.Set;

public class ProfessorProfileDataDTO {
    private List<ClassCoursResponseDTO> classes;
    private Set<Cours> courses;
    private ClassResponseDTO masterOfClass = null;
    private UserResponseDTO user;

    public List<ClassCoursResponseDTO> getClasses() {
        return classes;
    }

    public void setClasses(List<ClassCoursResponseDTO> classes) {
        this.classes = classes;
    }

    public Set<Cours> getCourses() {
        return courses;
    }

    public void setCourses(Set<Cours> courses) {
        this.courses = courses;
    }

    public ClassResponseDTO getMasterOfClass() {
        return masterOfClass;
    }

    public void setMasterOfClass(ClassResponseDTO masterOfClass) {
        this.masterOfClass = masterOfClass;
    }

    public UserResponseDTO getUser() {
        return user;
    }

    public void setUser(UserResponseDTO user) {
        this.user = user;
    }
}
