package com.example.demo.repository;

import com.example.demo.entity.ScolarYearStructure;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ScolarYearStructureRepository extends JpaRepository<ScolarYearStructure, Integer> {
    List<ScolarYearStructure> findAll();
}
