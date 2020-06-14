package com.example.demo.model.response;

import java.util.List;

public class TotalGradeFullResponse2DTO {
    List<TotalGradeResponse2DTO> listGrades;
    TotalGradeResponse2DTO averages;
    private MessageForTGR2DTO message;

    public List<TotalGradeResponse2DTO> getListGrades() {
        return listGrades;
    }

    public void setListGrades(List<TotalGradeResponse2DTO> listGrades) {
        this.listGrades = listGrades;
    }

    public TotalGradeResponse2DTO getAverages() {
        return averages;
    }

    public void setAverages(TotalGradeResponse2DTO averages) {
        this.averages = averages;
    }

    public MessageForTGR2DTO getMessage() {
        return message;
    }

    public void setMessage(MessageForTGR2DTO message) {
        this.message = message;
    }
}
