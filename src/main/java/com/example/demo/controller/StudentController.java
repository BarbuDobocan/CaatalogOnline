package com.example.demo.controller;

import com.example.demo.model.LocationDTO;
import com.example.demo.model.RegisterUserDTO;
import com.example.demo.service.StudentService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = {"http://192.168.214.225:3000","http://localhost:3000"})
@RestController()
@RequestMapping("/student")
@Slf4j
public class StudentController {

    @Autowired
    StudentService studentService;

    @PostMapping(path = "/addNewLocation")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity addNewLocation(@RequestBody LocationDTO locationDTO)
    {
        return studentService.addNewLocation(locationDTO);
    }

    @GetMapping(path = "/findAllMyLocations")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity findAllMyLocations(){
        return studentService.findAllMyLocations();
    }

//    @GetMapping(path = "/findMyGrades/{coursID}")
//    @PreAuthorize("hasRole('STUDENT')")
//    public ResponseEntity findMyGrades(@PathVariable("coursID") int coursID){
//        return studentService.findMyGrades(coursID);
//    }

    @GetMapping(path = "/findMyAbsences/{coursID}")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity findMyAbsences(@PathVariable("coursID") int coursID){
        return studentService.findMyAbsences(coursID);
    }

}
