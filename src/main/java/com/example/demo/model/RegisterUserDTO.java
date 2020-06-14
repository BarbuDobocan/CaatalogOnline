package com.example.demo.model;

import com.example.demo.entity.Cours;
import com.example.demo.entity.Role;
import com.example.demo.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

public class RegisterUserDTO {

    private String username;

    private String password;

    private int roleID;

    private boolean isActive;

    private String address;

    private String email;

    private String phoneNumber;

    private String fullName;

    private String registrationNumber;

    public RegisterUserDTO() {
    }

    public RegisterUserDTO(String username, String password, int roleID, boolean isActive, String address, String email, String phoneNumber, String fullName, String registrationNumber) {
        this.username = username;
        this.password = password;
        this.roleID = roleID;
        this.isActive = isActive;
        this.address = address;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.fullName = fullName;
        this.registrationNumber = registrationNumber;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getRoleID() {
        return roleID;
    }

    public void setRoleID(int roleID) {
        this.roleID = roleID;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getRegistrationNumber() {
        return registrationNumber;
    }

    public void setRegistrationNumber(String registrationNumber) {
        this.registrationNumber = registrationNumber;
    }
}
