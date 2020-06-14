package com.example.demo.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class ScolarYearStructure {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private boolean yearIsStarting = false;
    private boolean semIstart = false;
    private boolean semIstop = false;
    private boolean semIIstart = false;
    private boolean semIIstop = false;
    private boolean yearIsFinished = false;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public boolean isYearIsStarting() {
        return yearIsStarting;
    }

    public void setYearIsStarting(boolean yearIsStarting) {
        this.yearIsStarting = yearIsStarting;
    }

    public boolean isSemIstart() {
        return semIstart;
    }

    public void setSemIstart(boolean semIstart) {
        this.semIstart = semIstart;
    }

    public boolean isSemIstop() {
        return semIstop;
    }

    public void setSemIstop(boolean semIstop) {
        this.semIstop = semIstop;
    }

    public boolean isSemIIstart() {
        return semIIstart;
    }

    public void setSemIIstart(boolean semIIstart) {
        this.semIIstart = semIIstart;
    }

    public boolean isSemIIstop() {
        return semIIstop;
    }

    public void setSemIIstop(boolean semIIstop) {
        this.semIIstop = semIIstop;
    }

    public boolean isYearIsFinished() {
        return yearIsFinished;
    }

    public void setYearIsFinished(boolean yearIsFinished) {
        this.yearIsFinished = yearIsFinished;
    }
}
