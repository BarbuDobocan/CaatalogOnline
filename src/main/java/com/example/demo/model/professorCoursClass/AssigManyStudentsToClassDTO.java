package com.example.demo.model.professorCoursClass;

import java.util.List;

public class AssigManyStudentsToClassDTO {
    private int classId;
    private List<Integer> students;

    public int getClassId() {
        return classId;
    }

    public void setClassId(int classId) {
        this.classId = classId;
    }

    public List<Integer> getStudents() {
        return students;
    }

    public void setStudents(List<Integer> students) {
        this.students = students;
    }
}
