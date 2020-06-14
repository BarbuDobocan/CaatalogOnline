package com.example.demo.model.response;

import java.util.List;

public class RemoveClassFromMasterRespDTO {
    private ClassResponseDTO masterOfClass = null;
    private List<ClassResponseDTO> classesWithoutMaster;

    public ClassResponseDTO getMasterOfClass() {
        return masterOfClass;
    }

    public void setMasterOfClass(ClassResponseDTO masterOfClass) {
        this.masterOfClass = masterOfClass;
    }

    public List<ClassResponseDTO> getClassesWithoutMaster() {
        return classesWithoutMaster;
    }

    public void setClassesWithoutMaster(List<ClassResponseDTO> classesWithoutMaster) {
        this.classesWithoutMaster = classesWithoutMaster;
    }
}
