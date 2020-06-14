package com.example.demo.repository;

import com.example.demo.entity.Cours;
import com.example.demo.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;


@Repository
public interface CoursRepository extends JpaRepository<Cours, Integer> {
    Cours findByCoursName(final String coursName);
    Cours findById(final int coursID);
    List<Cours> findAll();
}
