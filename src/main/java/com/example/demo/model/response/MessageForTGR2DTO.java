package com.example.demo.model.response;

import com.example.demo.entity.Cours;

import java.util.List;

public class MessageForTGR2DTO {
    private String semIText;
    private String semIIText;
    private String finalText;

    public String getSemIText() {
        return semIText;
    }

    public void setSemIText(String semIText) {
        this.semIText = semIText;
    }

    public String getSemIIText() {
        return semIIText;
    }

    public void setSemIIText(String semIIText) {
        this.semIIText = semIIText;
    }

    public String getFinalText() {
        return finalText;
    }

    public void setFinalText(String finalText) {
        this.finalText = finalText;
    }
}
