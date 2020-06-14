package com.example.demo.controller;

import com.example.demo.entity.User;
import com.example.demo.exception.BusinessException;
import com.example.demo.model.JwtAuthenticationResponse;
import com.example.demo.model.RegisterUserDTO;
import com.example.demo.model.UserDTO;
import com.example.demo.repository.UserRepository;
import com.example.demo.security.JWTTokenProvider;
import com.example.demo.service.AallUserService;
import com.example.demo.service.AdminService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = {"http://192.168.214.225:3000","http://localhost:3000"})
@RestController()
@RequestMapping("/users")
@Slf4j
public class AallUsersController {

    @Autowired
    AallUserService aallUserService;

    @Autowired
    AdminService adminService;

    @PostMapping(path = "/login")
    public ResponseEntity authenticateUser(@RequestBody UserDTO userDTO) throws BusinessException
    {
       return aallUserService.login(userDTO);
    }

    @GetMapping(path = "/me")
    @PreAuthorize("hasAnyRole('ADMIN','PROFESSOR','PARENT','STUDENT')")
    public ResponseEntity me(){
       return aallUserService.me();
    }
}
