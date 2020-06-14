package com.example.demo.service;

import com.example.demo.entity.*;
import com.example.demo.model.LocationDTO;
import com.example.demo.model.NewAbsenceForStudentDTO;
import com.example.demo.model.NewGradeForStudentDTO;
import com.example.demo.repository.CatalogAbsenteRepository;
import com.example.demo.repository.CatalogNoteRepository;
import com.example.demo.repository.LocationRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@RestController()
public class StudentService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    LocationRepository locationRepository;

    @Autowired
    CatalogNoteRepository catalogNoteRepository;

    @Autowired
    CatalogAbsenteRepository catalogAbsenteRepository;

    public ResponseEntity findAllMyLocations(){
        System.out.println("|V|V|V|V|");
        UserPrincipal currentUser = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepository.findByUsername(currentUser.getUsername());
        System.out.println(user.getUsername());

        return ResponseEntity.ok(locationRepository.findByUserId(user.getId()));
    }

    public ResponseEntity addNewLocation(LocationDTO location){
        UserPrincipal currentUser = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepository.findByUsername(currentUser.getUsername());
        User selectedUser = userRepository.findById(user.getId());
        Locations newLocation = new Locations();
        newLocation.setLatitude(location.getLatitude());
        newLocation.setLongitude(location.getLongitude());

        if(selectedUser ==  null)
        {
            return ResponseEntity.ok("Selected User does not exist");
        } else {
                Set<Role> roles = selectedUser.getRoles();
                Role role = roles.iterator().next();
                if(role.getId()!=4){
                    return ResponseEntity.ok("The selected User not a student ! ");
                }
            newLocation.setUser(selectedUser);
        }
            locationRepository.save(newLocation);
            return ResponseEntity.ok(newLocation);
    }

//    public ResponseEntity findMyGrades(int coursID){
//        UserPrincipal currentUser = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//        User user = userRepository.findByUsername(currentUser.getUsername());
//        Set<NewGradeForStudentDTO> returnGrades = new HashSet<>(0);
//
//        Optional<List<CatalogNote>> grades;
//        if(coursID == -1){
//             grades = catalogNoteRepository.findByStudentId(user.getId());
//        }else{
//             grades = catalogNoteRepository.findByStudentIdAndCoursId(user.getId(), coursID);
//        }
//if(grades.isPresent())
//        for(CatalogNote grade : grades){
//            NewGradeForStudentDTO nota = new NewGradeForStudentDTO();
//            nota.setCoursId(grade.getCours().getId());
//            nota.setNota(grade.getNota());
//            nota.setProfessorId(grade.getProfessor().getId());
//            nota.setStudentId(grade.getStudent().getId());
//            returnGrades.add(nota);
//        }
//        return ResponseEntity.ok(returnGrades);
//    }

    public ResponseEntity findMyAbsences(int coursID){
        System.out.println("|Y|Y|Y|Y|");
        UserPrincipal currentUser = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepository.findByUsername(currentUser.getUsername());
        List<CatalogAbsente> absences = new ArrayList<CatalogAbsente>(0);

        if(coursID == -1){
            absences = catalogAbsenteRepository.findByStudentId(user.getId());
        }else{
            absences = catalogAbsenteRepository.findByStudentIdAndCoursId(user.getId(), coursID);
        }

        Set<NewAbsenceForStudentDTO> returnAbsences = new HashSet<>(0);
        for(CatalogAbsente a : absences){
            NewAbsenceForStudentDTO absence = new NewAbsenceForStudentDTO();
            absence.setCoursId(a.getCours().getId());
            absence.setDate(a.getDate());
            absence.setProfessorId(a.getProfessor().getId());
            absence.setStudentId(a.getStudent().getId());
            returnAbsences.add(absence);
        }

        return ResponseEntity.ok(returnAbsences);
    }
}
