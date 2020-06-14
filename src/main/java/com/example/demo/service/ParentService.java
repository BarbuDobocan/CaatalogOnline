package com.example.demo.service;

import com.example.demo.entity.*;
import com.example.demo.model.NewGradeForStudentDTO;
import com.example.demo.model.professorCoursClass.StudentResponseDTO;
import com.example.demo.repository.*;
import com.example.demo.security.UserPrincipal;
import net.bytebuddy.asm.Advice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController()
public class ParentService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    CatalogNoteRepository catalogNoteRepository;

    @Autowired
    CatalogAbsenteRepository catalogAbsenteRepository;

    @Autowired
    LocationRepository locationRepository;

    @Autowired
    ScolarYearStructureRepository scolarYearStructureRepository;

    public ResponseEntity findMyKids(){
        UserPrincipal currentUser = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User parent = userRepository.findByUsername(currentUser.getUsername());

        Set<Role> roles = parent.getRoles();
        Role role = roles.iterator().next();
        if(role.getId() != 3){
            return ResponseEntity.ok("The selected User is not a Parent ! ");
        }

        List<StudentResponseDTO> studentsResponse = new ArrayList<StudentResponseDTO>(0);
        for(User s : parent.getKids()){
            StudentResponseDTO a = new StudentResponseDTO();
            a.setRegistrationNumber(s.getRegistrationNumber());
            a.setId(s.getId());
            a.setEmail(s.getEmail());
            a.setName(s.getFullName());
            a.setUserName(s.getUsername());
            a.setPhoneNumber(s.getPhoneNumber());
            a.setRoles(s.getRoles());
            studentsResponse.add(a);
        }
        return ResponseEntity.ok(studentsResponse);
    }

//    public ResponseEntity findMyKidGrade(int kidId, int coursID){
//        UserPrincipal currentUser = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//        User parent = userRepository.findByUsername(currentUser.getUsername());
//
//        Set<Role> roles = parent.getRoles();
//        Role role = roles.iterator().next();
//
//        List<ScolarYearStructure> all = scolarYearStructureRepository.findAll();
//        ScolarYearStructure yearStructure = all.get(all.size()-1);
//        if(role.getId() != 3){
//            return ResponseEntity.ok("The selected User(Parent) is not a Parent ! ");
//        }
//
//        roles = userRepository.findById(kidId).getRoles();
//        role = roles.iterator().next();
//        if(role.getId() != 4){
//            return ResponseEntity.ok("The selected User(Student) is not a Student ! ");
//        }
//
//        boolean ok = false;
//        for(User kid : parent.getKids()){
//            if(kid.getId() == kidId){
//                ok = true;
//            }
//        }
//        if(!ok){
//            return ResponseEntity.ok("The selected kid is not in parent custody !! ");
//        }
//        List<CatalogNote> grades = new ArrayList<>(0);
//        Set<NewGradeForStudentDTO> returnGrades = new HashSet<>(0);
//        if(coursID == -1){
//            grades = catalogNoteRepository.findByStudentId(kidId);
//        }else{
//            grades = catalogNoteRepository.findByStudentIdAndCoursId(kidId, coursID);
//        }
////        for(CatalogNote grade : grades){
////            NewGradeForStudentDTO nota = new NewGradeForStudentDTO();
////            nota.setCoursId(grade.getCours().getId());
////            nota.setNota(grade.getNota());
////            nota.setProfessorId(grade.getProfessor().getId());
////            nota.setStudentId(grade.getStudent().getId());
////            returnGrades.add(nota);
////        }
//        return ResponseEntity.ok(grades);
//    }

    public ResponseEntity findMyKidAbsence(int kidId, int coursID){
        UserPrincipal currentUser = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User parent = userRepository.findByUsername(currentUser.getUsername());

        Set<Role> roles = parent.getRoles();
        Role role = roles.iterator().next();

        List<ScolarYearStructure> all = scolarYearStructureRepository.findAll();
        ScolarYearStructure yearStructure = all.get(all.size()-1);

        if(role.getId() != 3){
            return ResponseEntity.ok("The selected User(Parent) is not a Parent ! ");
        }

        roles = userRepository.findById(kidId).getRoles();
        role = roles.iterator().next();
        if(role.getId() != 4){
            return ResponseEntity.ok("The selected User(Student) is not a Student ! ");
        }

        boolean ok = false;
        for(User kid : parent.getKids()){
            if(kid.getId() == kidId){
                ok = true;
            }
        }
        if(!ok){
            return ResponseEntity.ok("The selected kid is not in parent custody !! ");
        }
        List<CatalogAbsente> absences = new ArrayList<>(0);
      //  Set<NewGradeForStudentDTO> returnAbsences = new HashSet<>(0);
        if(coursID == -1){
            absences = catalogAbsenteRepository.findByStudentId(kidId);
        }else{
            absences = catalogAbsenteRepository.findByStudentIdAndCoursId(kidId, coursID);
        }
        return ResponseEntity.ok(absences);
    }

//    public ResponseEntity findMyKidLocations(int kidId){
//        UserPrincipal currentUser = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//        User parent = userRepository.findByUsername(currentUser.getUsername());
//
//        Set<Role> roles = parent.getRoles();
//        Role role = roles.iterator().next();
//        if(role.getId() != 3){
//            return ResponseEntity.ok("The selected User(Parent) is not a Parent ! ");
//        }
//
//        roles = userRepository.findById(kidId).getRoles();
//        role = roles.iterator().next();
//        if(role.getId() != 4){
//            return ResponseEntity.ok("The selected User(Student) is not a Student ! ");
//        }
//
//        boolean ok = false;
//        for(User kid : parent.getKids()){
//            if(kid.getId() == kidId){
//                ok = true;
//            }
//        }
//        if(!ok){
//            return ResponseEntity.ok("The selected kid is not in parent custody !! ");
//        }
//        List<Locations> myKidLocations = locationRepository.findByUserId(kidId);
//        return ResponseEntity.ok(myKidLocations);
//    }


}
