package com.example.demo.repository;

import com.example.demo.entity.Class;
import com.example.demo.model.response.ClassResponseDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

public interface ClassRepository extends JpaRepository<Class, Integer> {
    Class findById(final int classID);
    List<Class> findByName(final String className);
    List<Class> findByYear(final int year);
    List<Class> findByProfessorsId(final int professorId);
    Optional<Class> findByStudentsId(final int studentID);
    List<Class> findByCoursesId(final int corsId);
    List<Class> findAll();

    @Query(value = "Select class.* from class left JOIN class_master on class.id = class_master.class_id Where professor_id IS NULL;", nativeQuery = true)
    List<Integer> findClassesThatHaveNotMasters();

    @Query(value = "SELECT class_id from class_master where professor_id = :masterID", nativeQuery = true)
    Optional<Integer> findByMasterId(final int masterID);

//    @Query(value = "select * from class where name = '" + :name + "' and year = :year", nativeQuery = true)
//    Optional<Class> findClassByNameAndYear(@Param("name") int name, @Param("year") int year);
}
