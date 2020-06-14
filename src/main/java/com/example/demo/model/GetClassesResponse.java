package com.example.demo.model;

import com.example.demo.entity.Class;
import com.example.demo.entity.Cours;
import com.example.demo.entity.User;

import java.util.List;
import java.util.Set;

public class GetClassesResponse {
    private Class classes;
    private Set<User> studentsThatAreNotInAClass;
    private Set<User> professorsNotThisClass;
    private List<Cours> coursesNotThisClass;
    private List<User> professorThatAreNotMasters;
  //  private User masterOfClass;

    public Class getClasses() {
        return classes;
    }

    public void setClasses(Class classes) {
        this.classes = classes;
    }

    public Set<User> getStudentsThatAreNotInAClass() {
        return studentsThatAreNotInAClass;
    }

    public void setStudentsThatAreNotInAClass(Set<User> studentsThatAreNotInAClass) {
        this.studentsThatAreNotInAClass = studentsThatAreNotInAClass;
    }

    public Set<User> getProfessorsNotThisClass() {
        return professorsNotThisClass;
    }

    public void setProfessorsNotThisClass(Set<User> professorsNotThisClass) {
        this.professorsNotThisClass = professorsNotThisClass;
    }

    public List<Cours> getCoursesNotThisClass() {
        return coursesNotThisClass;
    }

    public void setCoursesNotThisClass(List<Cours> coursesNotThisClass) {
        this.coursesNotThisClass = coursesNotThisClass;
    }

    public List<User> getProfessorThatAreNotMasters() {
        return professorThatAreNotMasters;
    }

    public void setProfessorThatAreNotMasters(List<User> professorThatAreNotMasters) {
        this.professorThatAreNotMasters = professorThatAreNotMasters;
    }

//    public User getMasterOfClass() {
//        return masterOfClass;
//    }
//
//    public void setMasterOfClass(User masterOfClass) {
//        this.masterOfClass = masterOfClass;
//    }
}
