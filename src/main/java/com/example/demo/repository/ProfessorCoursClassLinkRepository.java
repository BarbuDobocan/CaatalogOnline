package com.example.demo.repository;

import com.example.demo.entity.Class;
import com.example.demo.entity.professorCoursClass.ProfessorCoursClasaLink;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

//@Query(value = "DELETE FROM catalog_note where student_id = :studentId AND cours_id = :coursId", nativeQuery = true)
//    void deleteStudentGradesByCoursId(@Param("studentId") int studentId, @Param("coursId") int coursId);

@Repository
public interface ProfessorCoursClassLinkRepository extends JpaRepository<ProfessorCoursClasaLink, Integer> {
    List<ProfessorCoursClasaLink> findAll();

    ProfessorCoursClasaLink findById(final int id);

    @Query(value = "select * from professor_cours_clasa_link where class_id = :classId", nativeQuery = true)
    List<ProfessorCoursClasaLink> findByClassId(@Param("classId") int classId);

    @Query(value = "select * from professor_cours_clasa_link where cours_id = :coursId", nativeQuery = true)
    List<ProfessorCoursClasaLink> findByCoursId(@Param("coursId") int coursId);

    @Query(value = "select * from professor_cours_clasa_link where professor_id = :professorId", nativeQuery = true)
    List<ProfessorCoursClasaLink> findByProfessorId(@Param("professorId") int professorId);

    @Query(value = "select * from professor_cours_clasa_link where cours_id = :coursId and professor_id = :professorId", nativeQuery = true)
    List<ProfessorCoursClasaLink> findByCoursIdAndProfessorId(@Param("coursId") int coursId, @Param("professorId") int professorId);

    @Query(value = "select * from professor_cours_clasa_link where class_id = :classId and professor_id = :professorId", nativeQuery = true)
    List<ProfessorCoursClasaLink> findByClassIdAndProfessorId(@Param("classId") int classId, @Param("professorId") int professorId);

    @Query(value = "select * from professor_cours_clasa_link where class_id = :classId and cours_id = :coursId", nativeQuery = true)
    Optional<ProfessorCoursClasaLink> findByClassIdAndCoursId(@Param("classId") int classId, @Param("coursId") int coursId);

    @Query(value = "select * from professor_cours_clasa_link where class_id = :classId and cours_id = :coursId and professor_id = :professorId", nativeQuery = true)
    Optional<ProfessorCoursClasaLink> findByClassCoursProfessor(@Param("classId") int classId, @Param("coursId") int coursId, @Param("professorId") int professorId);

    @Query(value = "select distinct class_id from professor_cours_clasa_link where professor_id = :professorId and cours_id <> 10", nativeQuery = true)
    List<Integer> getProfessorClasses(@Param("professorId") int professorId);

    @Query(value = "select distinct cours_id from professor_cours_clasa_link where class_id = :classId", nativeQuery = true)
    List<Integer> getClassCourses(@Param("classId") int classId);

}
