package com.example.demo.controller;

import com.example.demo.model.*;
import com.example.demo.model.professorCoursClass.AssigManyStudentsToClassDTO;
import com.example.demo.model.professorCoursClass.CoursProfessorClassDTO;
import com.example.demo.model.response.ClassResponseDTO;
import com.example.demo.service.AdminService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = {"http://192.168.214.225:3000","http://localhost:3000"})
@RestController()
@RequestMapping("/admin")
@Slf4j
public class AdminController {

    @Autowired
    private AdminService adminService;

    @GetMapping(path = "/findUserById/{userId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity findUser(@PathVariable("userId") int userId)
    {
        return adminService.findUserById(userId);
    }

    @GetMapping(path = "/getRoles")
    @PreAuthorize("hasAnyRole('ADMIN','PROFESSOR','PARENT','STUDENT')")
    public ResponseEntity getRoles(){
        return adminService.getRoles();
    }

    @PostMapping(path = "/addNewUser")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity addNewUser(@RequestBody RegisterUserDTO registerUserDTO)
    {
        return adminService.register(registerUserDTO);
    }

    @DeleteMapping(path = "/removeUser/{userID}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity removeUser(@PathVariable("userID") int userID){
        return adminService.removeUser(userID);
    }

    @GetMapping(path = "/getAllUsers")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity getAllUsers(){return adminService.getAllUsers();}

    @GetMapping(path = "/findAllUsersWithRole/{roleID}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity findAllUsersWithRole(@PathVariable("roleID") int roleID){
        return adminService.findAllUsersWithRole(roleID);
    }

    @PostMapping(path = "/addNewCours")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity addNewCours(@RequestBody CoursDTO coursDTO){
        return adminService.addNewCours(coursDTO);
    }

    @DeleteMapping(path = "/removeCours/{coursID}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity removeCours(@PathVariable("coursID") int coursID)
    {
        return adminService.removeCours(coursID);
    }

    @GetMapping(path = "/getCourses")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity getCourses(){
        return  adminService.getCourses();
    }

    @PutMapping(path = "/assignCoursToProfessor/{professorID}/{coursID}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity assignCoursToProfessor(@PathVariable("professorID") int professorID, @PathVariable("coursID") int coursID){
        return adminService.assignCoursToProfessor(professorID, coursID);
    }

    @PutMapping(path = "/removeCoursFromProfessor/{professorID}/{coursID}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity removeCoursFromProfessor(@PathVariable("professorID") int professorID, @PathVariable("coursID") int coursID){
        return adminService.removeCoursFromProfessor(professorID, coursID);
    }

    @GetMapping(path = "/getStudentsThatAreNotHisKids/{parentID}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity getStudentsThatAreNotHisKids(@PathVariable("parentID") int parentID){
        return adminService.getStudentsThatAreNotHisKids(parentID);
    }

    @PutMapping(path = "/addKidsToParent")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity addKidsToParent(@RequestBody AssigManyStudentsToClassDTO assigManyStudentsToParentDTO){
        return  adminService.addKidsToParent(assigManyStudentsToParentDTO);
    }

    @PutMapping(path = "/removeKidFromParent/{parentID}/{kidID}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity removeKidFromParent(@PathVariable("parentID") int parentID, @PathVariable("kidID") int kidID){
        return adminService.removeKidFormParent(parentID, kidID);
    }

    @PutMapping(path = "/changeSelectedUserData")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity changeSelectedUserData(@RequestBody ChangeUserDataDTO changeUserDataDTO){
        return adminService.changeSelectedUserData(changeUserDataDTO);
    }

    @PostMapping(path = "/addNewClass")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity addNewClass(@RequestBody ClassDTO classDTO){
        return  adminService.addNewClass(classDTO);
    }

    @DeleteMapping(path = "/deleteClass/{classID}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity deleteClass(@PathVariable("classID") int classID){
        return adminService.deleteClass(classID);
    }

    @GetMapping(path = "/getClasses")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity getClasses(){return adminService.getClasses(); }


    @GetMapping(path = "/studentsThatAreNotInAClass")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity findAllStudentsThatAreNotInAClass(){
        return adminService.findAllStudentsThatAreNotInAClass();
    }

    @PutMapping(path = "/transferAllStudents/{fromClassID}/{toClassID}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity transferAllStudents(@PathVariable("fromClassID") int fromClassID,@PathVariable("toClassID") int toClassID){
        return adminService.transferAllStudents(fromClassID, toClassID);
    }

    @PutMapping(path = "/removeAllStudentsFromAClass/{classID}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity removeAllStudentsFromAClass(@PathVariable("classID") int classID){
        return adminService.removeAllStudentsFromAClass(classID);
    }

    @GetMapping(path = "/getProfessorProfileData/{professorID}")
    @PreAuthorize("hasAnyRole('ADMIN','PROFESSOR')")
    public ResponseEntity getProfessorProfileData(@PathVariable("professorID") int professorID){
        return adminService.getProfessorProfileData(professorID);
    }

    @GetMapping(path = "/getProfessorUnassignedCourses/{professorID}")
    @PreAuthorize("hasAnyRole('ADMIN','PROFESSOR')")
    public ResponseEntity getProfessorUnassignedCourses(@PathVariable("professorID") int professorID){
        return adminService.getProfessorUnassignedCourses(professorID);
    }

    @GetMapping(path = "/getProfessorUnassignedClasses/{professorId}")
    @PreAuthorize("hasAnyRole('ADMIN','PROFESSOR')")
    public ResponseEntity getProfessorUnassignedClasses(@PathVariable("professorId") int professorId){
        return adminService.getProfessorUnassignedClasses(professorId);
    }

    @PutMapping(path = "/assignMasterToClass/{classID}/{professorID}")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity assignMasterToClass(@PathVariable("classID") int classID, @PathVariable("professorID") int professorID)
    {
        return adminService.assignMasterToClass(classID, professorID);
    }

    @PutMapping(path = "/removeMasterOfClass/{classID}")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity removeMasterOfClass(@PathVariable("classID") int classID){
        return adminService.removeMasterOfClass(classID);
    }

    @PutMapping(path = "/removeClassFromMaster/{professorID}")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity removeClassFromMaster(@PathVariable("professorID") int professorID){
        return adminService.removeClassFromMaster(professorID);
    }

    @PutMapping(path = "/startNewYear")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity startNewYear() {
        return adminService.yearWillStart();
    }

    @PutMapping(path = "/startSemI")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity startSemI(){
        return adminService.startSemI();
    }

    @PutMapping(path = "/stopSemI")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity stopSemI(){
        return adminService.stopSemI();
    }

    @PutMapping(path = "/startSemII")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity startSemII(){
        return adminService.startSemII();
    }

    @PutMapping(path = "/stopSemII")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity stopSemII(){
        return adminService.stopSemII();
    }

    @PutMapping(path = "/yearIsFinished")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity yearIsFinished(){
        return adminService.yearIsFinished();
    }

    @GetMapping(path = "/getYearStructure")
    @PreAuthorize("hasAnyRole('ADMIN','PROFESSOR','PARENT','STUDENT')")
    public ResponseEntity getYearStructure() { return adminService.getYearStructure(); }

    ////////////////===================

    @PostMapping(path = "/assignCoursByProfessorToClass")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity assignCoursByProfessorToClass(@RequestBody CoursProfessorClassDTO coursProfessorClassDTO){
        return adminService.assignCoursByProfessorToClass(coursProfessorClassDTO);
    }

    ///cursurile assignate si profesorii care le predau
    @GetMapping(path = "/getCoursByProfessorsOfClass/{classId}")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity getCoursByProfessorsOfClass(@PathVariable("classId") int classId){
        return adminService.getCoursByProfessorsOfClass(classId);
    }

    @DeleteMapping(path = "/removeCoursByProfessorFromClass/{classId}/{coursId}")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity removeCoursByProfessorFromClass(@PathVariable("classId") int classId, @PathVariable("coursId") int coursId){
        return adminService.removeCoursByProfessorFromClass(classId, coursId);
    }

    @GetMapping(path = "/getCoursAndItsProfessor")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity getCoursAndItsProfessor(){
        return adminService.getCoursAndItsProfessor();
    }

    @GetMapping(path = "/getClassProfileData/{classId}")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity getClassProfileData(@PathVariable("classId") int classId){
        return adminService.getClassProfileData(classId);
    }

    @PutMapping(path = "/changeClassProfileData")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity changeClassProfileData(@RequestBody ClassResponseDTO classResponseDTO)
    {
        return adminService.changeClassProfileData(classResponseDTO);
    }

    @GetMapping(path = "/getFreeStudents")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity getFreeStudents(){
        return adminService.getFreeStudents();
    }

    @PutMapping(path = "/assignManyStudentsToClass")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity assignManyStudentsToClass(@RequestBody AssigManyStudentsToClassDTO assigManyStudentsToClassDTO){
        return adminService.assignManyStudentsToClass(assigManyStudentsToClassDTO);
    }

    @PutMapping(path="/assignStudentToClass/{classID}/{studentID}")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity assignStudentToClass(@PathVariable("classID") int classID, @PathVariable("studentID") int studentID){
        return adminService.assignStudentToClass(classID, studentID);
    }

    @PostMapping(path="/addFinalsToStudentAndAssignHimToClass")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity addFinalsToStudentAndAssignHimToClass(@RequestBody TransfStudentDataDTO transfStudentDataDTO){
        return adminService.addFinalsToStudentAndAssignHimToClass(transfStudentDataDTO);
    }

    @PutMapping(path = "/takeOutStudentFromClass/{studentId}/{classId}")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity takeOutStudendFromClass(@PathVariable("studentId") int studentId, @PathVariable("classId") int classId){
        return adminService.takeOutStudendFromClass(studentId, classId);
    }

    @GetMapping(path = "/findUnassignedCoursesProfToClass/{classId}")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity findUnassignedCoursesProfToClass(@PathVariable("classId") int classId){
        return adminService.findUnassignedCoursesToClass(classId);
    }

    @PostMapping(path = "/assignManyCoursesToAClass/{classId}")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity assignManyCoursesToAClass(
            @RequestBody List<CoursProfessorClassDTO> listCoursProfessorClassDTO,
            @PathVariable("classId") int classId) {
        return adminService.assignManyCoursesToAClass(listCoursProfessorClassDTO, classId);
    }

    @GetMapping(path = "/getProfessorsThatAreNotMastersForClassProfile")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity getProfessorsThatAreNotMastersForClassProfile(){
        return adminService.getProfessorsThatAreNotMastersForClassProfile();
    }

    @GetMapping(path = "/getParentProfileData/{parentID}")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity getParentProfileData(@PathVariable("parentID") int parentID){
        return adminService.getParentProfileData(parentID);
    }

    @DeleteMapping(path = "/deleteUserById/{userID}")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity deleteUserById(@PathVariable("userID") int userID){
        return adminService.deleteUserById(userID);
    }

    ////////////////===================
}
