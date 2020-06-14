package com.example.demo.model;

import com.example.demo.entity.ScolarYearStructure;

public class YearStructureDTO {
    private ScolarYearStructure scolarYearStructure;
    private int nrStep;

    public ScolarYearStructure getScolarYearStructure() {
        return scolarYearStructure;
    }

    public void setScolarYearStructure(ScolarYearStructure scolarYearStructure) {
        this.scolarYearStructure = scolarYearStructure;
    }

    public int getNrStep() {
        return nrStep;
    }

    public void setNrStep(int nrStep) {
        this.nrStep = nrStep;
    }
}
