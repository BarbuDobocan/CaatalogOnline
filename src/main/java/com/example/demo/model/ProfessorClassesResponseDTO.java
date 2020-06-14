package com.example.demo.model;

import com.example.demo.entity.Class;

import java.util.List;

public class ProfessorClassesResponseDTO {
  private List<Class>  assignedClasses;
  private List<Class>  unassignedClasses;

    public List<Class>  getAssignedClasses() {
        return assignedClasses;
    }

    public void setAssignedClasses(List<Class> assignedClasses) {
        this.assignedClasses = assignedClasses;
    }

    public List<Class> getUnassignedClasses() {
        return unassignedClasses;
    }

    public void setUnassignedClasses(List<Class> unassignedClasses) {
        this.unassignedClasses = unassignedClasses;
    }
}
