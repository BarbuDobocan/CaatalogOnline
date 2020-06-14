package com.example.demo.entity;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Class extends AMyEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;

    private int year;


    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name="class_id")
    private Set<User> students = new HashSet<>(0);

    @ManyToMany
    @JoinTable(name = "classes_professors", joinColumns = @JoinColumn(name = "class_id"), inverseJoinColumns = @JoinColumn(name = "professor_id"))
    private Set<User> professors = new HashSet<>(0);


    @ManyToMany
    @JoinTable(name = "classes_courses", joinColumns = @JoinColumn(name = "class_id"), inverseJoinColumns = @JoinColumn(name = "cours_id"))
    private Set<Cours> courses = new HashSet<>(0);


    //diriginte
    @OneToOne
    @JoinTable(name = "class_master",
            joinColumns = @JoinColumn(name = "class_id"),
            inverseJoinColumns = @JoinColumn(name = "professor_id"))
    private User masterOfClass;


    public Class() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public Set<User> getStudents() {
        return students;
    }

    public void setStudents(Set<User> students) {
        this.students = students;
    }

    public void addStudent(User newUser){
        this.students.add(newUser);
    }

    public void removeStudent(User user){
        this.students.remove(user);
    }

    public User getMasterOfClass() {
        return masterOfClass;
    }

    public void setMasterOfClass(User masterOfClass) {
        this.masterOfClass = masterOfClass;
    }

}
