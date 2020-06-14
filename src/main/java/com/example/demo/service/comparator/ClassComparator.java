package com.example.demo.service.comparator;

import com.example.demo.entity.Class;
import com.example.demo.model.response.ClassResponseDTO;

import java.util.Comparator;

public class ClassComparator implements Comparator<ClassResponseDTO> {
    public int compare(ClassResponseDTO c1, ClassResponseDTO c2){

        int value1 = c1.getYear() - c2.getYear();
        if(value1 == 0){
            return c1.getName().compareTo(c2.getName());
        }
        else
        {
            return value1;
        }
    }
}
