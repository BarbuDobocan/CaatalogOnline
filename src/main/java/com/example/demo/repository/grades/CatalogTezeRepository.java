package com.example.demo.repository.grades;

import com.example.demo.entity.CatalogTeze;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;


public interface CatalogTezeRepository extends JpaRepository<CatalogTeze, Integer> {
    Optional<List<CatalogTeze>> findByStudentId(final int studentId);

    @Query(value = "select * from catalog_teze where student_id = :studentId and cours_id = :coursId and semester = :semester", nativeQuery = true)
    Optional<CatalogTeze> findByStudentIdProfessorIdSemester(@Param("studentId") int studentId,
                                                             @Param("coursId") int coursId,
                                                             @Param("semester") int semester);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM catalog_teze", nativeQuery = true)
    void deleteThesis();
}
