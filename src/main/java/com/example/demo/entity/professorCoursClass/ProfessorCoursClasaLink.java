package com.example.demo.entity.professorCoursClass;

import com.example.demo.entity.Class;
import com.example.demo.entity.Cours;
import com.example.demo.entity.User;

import javax.persistence.*;

@Entity
public class ProfessorCoursClasaLink {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "professor_id")
    private User professor;

    @ManyToOne
    @JoinColumn(name = "class_id")
    private Class clasa;

    @ManyToOne
    @JoinColumn(name = "cours_id")
    private Cours cours;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public User getProfessor() {
        return professor;
    }

    public void setProfessor(User professor) {
        this.professor = professor;
    }

    public Class getClasa() {
        return clasa;
    }

    public void setClasa(Class clasa) {
        this.clasa = clasa;
    }

    public Cours getCours() {
        return cours;
    }

    public void setCours(Cours cours) {
        this.cours = cours;
    }
}
