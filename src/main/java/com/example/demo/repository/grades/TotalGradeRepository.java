package com.example.demo.repository.grades;

import com.example.demo.entity.CatalogAbsente;
import com.example.demo.entity.grades.FinalGradeCours;
import com.example.demo.entity.grades.TotalGrade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Repository
public interface TotalGradeRepository extends JpaRepository<TotalGrade, Integer> {
    List<TotalGrade> findAll();
    List<TotalGrade> findByStudentId(int studentId);

    @Query(value = "select * from total_grade where student_id = :studentId and semester = :semester", nativeQuery = true)
    Optional<TotalGrade> findByStudentIdAndCoursId(@Param("studentId") int studentId, @Param("semester") int semester);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM total_grade", nativeQuery = true)
    void deleteTotalGrades();
}
