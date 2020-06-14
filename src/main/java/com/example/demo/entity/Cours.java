package com.example.demo.entity;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;


@Entity
public class Cours extends AMyEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String coursName;

    public Cours() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCoursName() {
        return coursName;
    }

    public void setCoursName(String coursName) {
        this.coursName = coursName;
    }

}
