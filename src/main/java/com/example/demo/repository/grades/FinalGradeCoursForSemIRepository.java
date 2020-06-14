//package com.example.demo.repository.grades;
//
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Query;
//import org.springframework.data.repository.query.Param;
//import org.springframework.stereotype.Repository;
//
//import java.util.List;
//import java.util.Optional;
//
//@Repository
//public interface FinalGradeCoursForSemIRepository  extends JpaRepository<Integer, Integer> {
//    List<FinalGradeCoursForSemI> findAll();
//    List<FinalGradeCoursForSemI> findByStudentId(final int studentID);
//
//    @Query(value = "select * from final_grade_cours_for_semi where student_id = :studentId and cours_id = :coursId", nativeQuery = true)
//    Optional<FinalGradeCoursForSemI> findByStudentIdAndCoursId(@Param("studentId") int studentId, @Param("coursId") int coursId);
//
//    @Query(value = "select * from final_grade_cours_for_semi where student_id = :studentId and cours_id = :coursId", nativeQuery = true)
//    FinalGradeCoursForSemI findByStudentIdAndCoursIdReal(@Param("studentId") int studentId, @Param("coursId") int coursId);
//}
