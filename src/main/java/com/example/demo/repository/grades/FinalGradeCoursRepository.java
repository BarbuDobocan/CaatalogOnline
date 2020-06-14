package com.example.demo.repository.grades;

import com.example.demo.entity.grades.FinalGradeCours;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Repository
public interface FinalGradeCoursRepository extends JpaRepository<FinalGradeCours, Integer> {
    Optional<FinalGradeCours> findById(final int id);
    List<FinalGradeCours> findAll();
    List<FinalGradeCours> findByStudentId(final int studentID);

    @Query(value = "select * from final_grade_cours where student_id = :studentId and cours_id = :coursId and semester = :semester",
            nativeQuery = true)
    Optional<FinalGradeCours> findByStudentIdAndCoursId(@Param("studentId") int studentId,
                                                        @Param("coursId") int coursId,
                                                        @Param("semester") int semester);

    @Query(value = "select * from final_grade_cours where student_id = :studentId and cours_id = :coursId and semester = :semester",
            nativeQuery = true)
    FinalGradeCours findByStudentIdAndCoursIdReal(@Param("studentId") int studentId,
                                                  @Param("coursId") int coursId,
                                                  @Param("semester") int semester);

    /// de aici e problema
    @Query(value = "select * from final_grade_cours where student_id = :studentId and cours_id = :coursId", nativeQuery = true)
    List<FinalGradeCours> findByStudentAndCours(@Param("studentId") int studentId, @Param("coursId") int coursId);

    @Query(value = "select * from final_grade_cours where student_id = :studentId and semester = :semester and grade < :maxGrade", nativeQuery = true)
    Optional<List<FinalGradeCours>> findByStudentSemesterMaxGrade(@Param("studentId") int studentId,
                                                        @Param("semester") int semester,
                                                        @Param("maxGrade") int maxGrade);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM final_grade_cours", nativeQuery = true)
    void deleteFinalGrades();


}
