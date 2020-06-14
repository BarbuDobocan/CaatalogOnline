package com.example.demo.controller;

import com.example.demo.entity.User;
import com.example.demo.model.*;
import com.example.demo.service.ProfessorService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = {"http://192.168.214.225:3000","http://localhost:3000"})
@RestController()
@RequestMapping("/professor")
@Slf4j
public class ProfessorController {

    @Autowired
    ProfessorService professorService;

    @PostMapping(path = "/assignTezaToStudent")
    @PreAuthorize("hasRole('PROFESSOR')")
    public ResponseEntity assignTezaToStudent(@RequestBody NewGradeForStudentDTO gradeDTO){
        return professorService.assignTezaToStudent(gradeDTO);
    }

    @DeleteMapping(path = "/deleteTezaFromStudent/{tezaId}")
    @PreAuthorize("hasRole('PROFESSOR')")
    public ResponseEntity deleteTezaFromStudent(@PathVariable("tezaId") int tezaId){
        return professorService.deleteTezaFromStudent(tezaId);
    }

    @PostMapping(path = "/assignGradeToStudent")
    @PreAuthorize("hasRole('PROFESSOR')")
    public ResponseEntity assignGradeToStudent(@RequestBody NewGradeForStudentDTO gradeDTO)
    {
        return professorService.assignGradeToStudent(gradeDTO);
    }

    @PostMapping(path = "/addAbsenceToStudent")
    @PreAuthorize("hasRole('PROFESSOR')")
    public ResponseEntity addAbsenceToStudent(@RequestBody NewAbsenceForStudentDTO absenceDTO){
        return professorService.addAbsenceToAStudent(absenceDTO);
    }

    @GetMapping(path = "/findAllClasses")
    @PreAuthorize("hasAnyRole('ADMIN','PROFESSOR')")
    public ResponseEntity findAllClasses(){
        return professorService.findAllClasses();
    }

    @GetMapping(path = "/findAllStudentsFromAClass/{classID}")
    @PreAuthorize("hasAnyRole('PROFESSOR')")
    public ResponseEntity findAllStudentsFromAClass(@PathVariable("classID") int classID){
        return professorService.findAllStudentsFromAClass(classID);
    }

    @GetMapping(path = "/findStudentLocations/{studentID}")
    @PreAuthorize("hasAnyRole('ADMIN','PROFESSOR')")
    public ResponseEntity findStudentLocations(@PathVariable("studentID") int studentID){
        return professorService.findStudentLocations(studentID);
    }

//    @GetMapping(path = "/getStudentGrades/{studentID}")
//    @PreAuthorize("hasAnyRole('ADMIN','PROFESSOR')")
//    public ResponseEntity getStudentGrades(@PathVariable("studentID") int studentID){
//        return professorService.getStudentGrades(studentID);
//    }

    @GetMapping(path = "/getStudentAbsences/{studentID}")
    @PreAuthorize("hasAnyRole('ADMIN','PROFESSOR','PARENT','STUDENT')")
    public ResponseEntity getStudentAbsences(@PathVariable("studentID") int studentID){
        return professorService.getStudentAbsences(studentID);
    }

    @GetMapping(path = "/getStudentProfileData/{studentID}")
    @PreAuthorize("hasAnyRole('ADMIN','PROFESSOR','PARENT','STUDENT')")
    public ResponseEntity getStudentProfileData(@PathVariable("studentID") int studentID){
        return professorService.findStudentProfileData(studentID);
    }

    @PostMapping(path = "/setStudentTotalGrade")
    @PreAuthorize("hasRole('PROFESSOR')")
    public ResponseEntity setStudentTotalGrade(@RequestBody SetTotalGradeDTO setTotalGradeDTO){
        return professorService.setTotalGrade(setTotalGradeDTO);
    }

    @GetMapping(path = "/getMyCourses")
    @PreAuthorize("hasRole('PROFESSOR')")
    public ResponseEntity getMyCourses(){
        return professorService.getMyCourses();
    }

    @GetMapping(path = "/findStudentGradesForFinal/{studentId}/{coursId}/{semester}")
    @PreAuthorize("hasAnyRole('ADMIN','PROFESSOR','PARENT','STUDENT')")
    public ResponseEntity findStudentGradesForFinal(
            @PathVariable("studentId") int studentId,
            @PathVariable("coursId") int coursId,
            @PathVariable("semester") int semester
    ){
        return professorService.findStudentGradesForFinal(studentId, coursId, semester);
    }

    @DeleteMapping(path = "/deleteGrade/{gradeId}")
    @PreAuthorize("hasAnyRole('ADMIN','PROFESSOR')")
    public ResponseEntity deleteGrade(@PathVariable("gradeId") int gradeId){
        return professorService.deleteGrade(gradeId);
    }

    @GetMapping(path = "/findStudentAbsences/{studentId}/{coursId}/{semester}")
    @PreAuthorize("hasAnyRole('ADMIN','PROFESSOR','PARENT','STUDENT')")
    public ResponseEntity findStudentAbsences(@PathVariable("studentId") int studentId,
                                              @PathVariable("coursId") int coursId,
                                              @PathVariable("semester") int semester){
        return professorService.findStudentAbsences(studentId, coursId, semester);
    }

    @DeleteMapping(path = "/deleteAbsence/{absenceId}")
    @PreAuthorize("hasAnyRole('PROFESSOR')")
    public ResponseEntity deleteAbsence(@PathVariable("absenceId") int absenceId){
        return professorService.deleteAbsence(absenceId);
    }

    @PutMapping(path = "/motivateAbsence/{absenceId}/{selectedCoursId}")
    @PreAuthorize("hasAnyRole('PROFESSOR')")
    public ResponseEntity motivateAbsence(@PathVariable("absenceId") int absenceId, @PathVariable("selectedCoursId") int selectedCoursId){
        return professorService.motivateAbsence(absenceId, selectedCoursId);
    }

    @PostMapping(path = "/setStudentFinalGrade")
    @PreAuthorize("hasRole('PROFESSOR')")
    public ResponseEntity setStudentFinalGrade(@RequestBody SetFinalGradeDTO finalGradeDTO){
        return professorService.setStudentFinalGrade(finalGradeDTO);
    }

    @PostMapping(path = "/setStudentFinalGradeBehavior")
    @PreAuthorize("hasRole('PROFESSOR')")
    public ResponseEntity setStudentFinalGradeBehavior(@RequestBody SetFinalGradeDTO finalGradeDTO){
        return professorService.setStudentFinalGradeBehavior(finalGradeDTO);
    }

    @DeleteMapping(path = "/deleteStudentFinalGrade/{studentId}")
    @PreAuthorize("hasRole('PROFESSOR')")
    public ResponseEntity deleteStudentFinalGrade(@PathVariable("studentId") int studentId){
        return professorService.deleteStudentFinalGrade(studentId);
    }

    @DeleteMapping(path = "/removeStudentFinalGrade/{finalGradeId}")
    @PreAuthorize("hasRole('PROFESSOR')")
    public ResponseEntity removeStudentFinalGrade(@PathVariable("finalGradeId") int finalGradeId){
        return professorService.removeStudentFinalGrade(finalGradeId);
    }

    @DeleteMapping(path = "/deleteStudentTotalGrade/{tgId}")
    public ResponseEntity deleteStudentTotalGrade(@PathVariable("tgId") int tgId){
        return professorService.deleteStudentTotalGrade(tgId);
    }

    @GetMapping(path = "/getMyClasses")
    @PreAuthorize("hasRole('PROFESSOR')")
    public ResponseEntity getMyClasses(){
        return professorService.getMyClasses();
    }

    @GetMapping(path = "/masterForThisClass")
    @PreAuthorize("hasRole('PROFESSOR')")
    public ResponseEntity masterForThisClass(){
        return professorService.masterForThisClass();
    }


    @GetMapping(path = "/findStudentAllTypeGrades/{studentId}")
    @PreAuthorize("hasRole('PROFESSOR')")
    public ResponseEntity findStudentAllTypeGrades(@PathVariable("studentId") int studentId){
        return professorService.findStudentAllTypeGrades(studentId);
    }
}
