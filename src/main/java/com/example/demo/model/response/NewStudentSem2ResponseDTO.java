package com.example.demo.model.response;

import com.example.demo.entity.Cours;

import java.util.List;

public class NewStudentSem2ResponseDTO {
   private List<Cours> response;
   private boolean showModal;

    public List<Cours> getResponse() {
        return response;
    }

    public void setResponse(List<Cours> response) {
        this.response = response;
    }

    public boolean isShowModal() {
        return showModal;
    }

    public void setShowModal(boolean showModal) {
        this.showModal = showModal;
    }
}
