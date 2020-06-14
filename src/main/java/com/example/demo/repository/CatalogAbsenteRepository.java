package com.example.demo.repository;

import com.example.demo.entity.CatalogAbsente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface CatalogAbsenteRepository extends JpaRepository<CatalogAbsente, Integer> {
    CatalogAbsente findById(final int absenceId);

    List<CatalogAbsente> findByStudentId(final int studentId);

    @Query(value = "SELECT * FROM catalog_absente where student_id = :studentId AND cours_id = :coursId", nativeQuery = true)
    List<CatalogAbsente> findByStudentIdAndCoursId(@Param("studentId") int studentId, @Param("coursId") int coursId);

    @Query(value = "SELECT * FROM catalog_absente where student_id = :studentId AND cours_id = :coursId AND semester = :semester", nativeQuery = true)
    List<CatalogAbsente> findByStudentIdCoursIdSemester(@Param("studentId") int studentId, @Param("coursId") int coursId, @Param("semester") int semester);

    @Query(value = "select * from catalog_absente where student_id = :studentId and semester = :semester", nativeQuery = true)
    List<CatalogAbsente> findByStudentAndSemester(@Param("studentId") int studentId, @Param("semester") int semester);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM catalog_absente where student_id = :studentId AND cours_id = :coursId", nativeQuery = true)
    void deleteStudentAbsenceByCoursId(@Param("studentId") int studentId, @Param("coursId") int coursId);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM catalog_absente", nativeQuery = true)
    void deleteMissings();

    List<CatalogAbsente> findByCoursId(final int coursId);
}
