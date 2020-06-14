package com.example.demo.model;

import com.example.demo.entity.Cours;

import java.util.List;
import java.util.Set;

public class ProfessorCoursesResponseDTO {
   private Set<Cours> assignedCourses;
   private List<Cours> unassignedCourses;

    public Set<Cours> getAssignedCourses() {
        return assignedCourses;
    }

    public void setAssignedCourses(Set<Cours> assignedCourses) {
        this.assignedCourses = assignedCourses;
    }

    public List<Cours> getUnassignedCourses() {
        return unassignedCourses;
    }

    public void setUnassignedCourses(List<Cours> unassignedCourses) {
        this.unassignedCourses = unassignedCourses;
    }
}
