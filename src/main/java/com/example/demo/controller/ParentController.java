package com.example.demo.controller;


import com.example.demo.service.ParentService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = {"http://192.168.214.225:3000","http://localhost:3000"})
@RestController()
@RequestMapping("/parent")
@Slf4j
public class ParentController {

    @Autowired
    ParentService parentService;

    @GetMapping(path = "/findMyKids")
    @PreAuthorize("hasRole('PARENT')")
    public ResponseEntity findMyKids(){
        return parentService.findMyKids();
    }

//    @GetMapping(path = "/findMyKidGrade/{kidID}/{coursID}")
//    @PreAuthorize("hasRole('PARENT')")
//    public ResponseEntity findMyKidGrade(@PathVariable("kidID") int kidID, @PathVariable("coursID") int coursID){
//        return parentService.findMyKidGrade(kidID, coursID);
//    }

    @GetMapping(path = "/findMyKidAbsence/{kidID}/{coursID}")
    @PreAuthorize("hasRole('PARENT')")
    public ResponseEntity findMyKidAbsence(@PathVariable("kidID") int kidID, @PathVariable("coursID") int coursID){
        return parentService.findMyKidAbsence(kidID, coursID);
    }

//    @GetMapping(path = "/findMyKidLocations/{kidID}")
//    @PreAuthorize("hasRole('PARENT')")
//    public ResponseEntity findMyKidLocations(@PathVariable("kidID") int kidID){
//        return parentService.findMyKidLocations(kidID);
//    }

}
