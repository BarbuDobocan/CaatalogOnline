package com.example.demo.repository;

import com.example.demo.entity.CatalogNote;
import com.example.demo.entity.Role;
import com.example.demo.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    User findById(final int userID);
    User findByUsername(final String username);
    User findByRegistrationNumber(final String registrationNumber);
    User findByEmail(final String email);
    List<User> findAll();

    @Query(value = "select user.id from user_role INNER JOIN user ON user_role.user_id = user.id WHERE user_role.role_id = :roleId", nativeQuery = true)
    Set<Integer> findAllUsersIDsWithRole(@Param("roleId") int roleId);

    @Query(value = "select user.* from user_role INNER JOIN user ON user_role.user_id = user.id WHERE user_role.role_id = :roleId", nativeQuery = true)
    List<User> findAllUsersWithRole(@Param("roleId") int roleId);

    @Query(value = "select u.* from user u RIGHT JOIN class_master cm ON u.id = cm.professor_id;", nativeQuery = true)
    List<User> findAllClassMasters();

    @Query(value="select u.* from user u JOIN user_role ur ON u.id=ur.user_id where u.class_id IS NULL and ur.role_id=4", nativeQuery = true)
    Set<User> findAllStudentsThatAreNotInAClass();

    @Query(value="update user set class_id=null where id=:userId", nativeQuery = true)
    Void removeStudentFromClass(@Param("userId") int userId);

    @Query(value=" SELECT u.* FROM user u JOIN professor_cours pc ON u.id = pc.user_id AND pc.cours_id = :coursId", nativeQuery = true)
    List<User> findProfessorsThatTeachThisCours(@Param("coursId") int coursId);

    @Query(value="select parent_id from parent_student where student_id = :studentId", nativeQuery = true)
    List<Integer> studentParents(@Param("studentId") int studentId);

}
