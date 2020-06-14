package com.example.demo.repository;

import com.example.demo.entity.CatalogAbsente;
import com.example.demo.entity.CatalogNote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Repository
public interface CatalogNoteRepository extends JpaRepository<CatalogNote, Integer> {
    CatalogNote findById(final int gradeId);

    Optional<List<CatalogNote>> findByStudentId(final int studentId);

    @Query(value = "SELECT * FROM catalog_note where student_id = :studentId AND cours_id = :coursId", nativeQuery = true)
    List<CatalogNote> findByStudentIdAndCoursId(@Param("studentId") int studentId, @Param("coursId") int coursId);

    @Query(value = "select * from catalog_note where student_id = :studentId and cours_id = :coursId and semester = :semester", nativeQuery = true)
    List<CatalogNote> findByStudentIdCoursIdAndSemester(@Param("studentId") int studentId,
                                                        @Param("coursId") int coursId,
                                                        @Param("semester") int semester);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM catalog_note", nativeQuery = true)
    void deleteGrades();

    List<CatalogNote> findByCoursId(final int coursId);
}
