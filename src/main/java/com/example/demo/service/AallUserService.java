package com.example.demo.service;

import com.example.demo.entity.User;
import com.example.demo.exception.BusinessException;
import com.example.demo.exception.MessageForUser;
import com.example.demo.model.JwtAuthenticationResponse;
import com.example.demo.model.UserDTO;
import com.example.demo.repository.UserRepository;
import com.example.demo.security.JWTTokenProvider;
import com.example.demo.security.UserPrincipal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.RestController;

import java.util.Objects;

@RestController()
@Slf4j
public class AallUserService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JWTTokenProvider jwtTokenProvider;

    @Autowired
    private UserRepository userRepository;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();;

    public ResponseEntity login(UserDTO userDTO){
        if (Objects.isNull(userDTO)) {
            System.out.println("Body null !");
            MessageForUser msg = new MessageForUser();
            msg.setMessage("Body null !");
            return ResponseEntity.ok(msg);
        }

        if (Objects.isNull(userDTO.getUsername()) || userDTO.getUsername()==null) {
            System.out.println("Username cannot be null ! ");
            MessageForUser msg = new MessageForUser();
            msg.setMessage("Username cannot be null ! ");
            return ResponseEntity.ok(msg);
        }

        if (Objects.isNull(userDTO.getPassword()) || userDTO.getPassword()==null) {
            System.out.println("Password cannot be null !");
            MessageForUser msg = new MessageForUser();
            msg.setMessage("Password cannot be null !");
            return ResponseEntity.ok(msg);
        }

        final User user = userRepository.findByUsername(userDTO.getUsername());

        if (Objects.isNull(user)) {
            System.out.println("Bad credentials !1");
            MessageForUser msg = new MessageForUser();
            msg.setMessage("Bad credentials !");
            return ResponseEntity.ok(msg);
        }

        if (!passwordEncoder.matches(userDTO.getPassword(), user.getPassword())) {
            System.out.println("Bad credentials !2");
            MessageForUser msg = new MessageForUser();
            msg.setMessage("Bad credentials !");
            return ResponseEntity.ok(msg);
        }

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(userDTO.getUsername(), userDTO.getPassword()));

        final String token = jwtTokenProvider.generateToken(authentication);

        return ResponseEntity.ok(new JwtAuthenticationResponse(token));
    }

    public ResponseEntity me(){
        UserPrincipal currentUser = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User me = userRepository.findByUsername(currentUser.getUsername());

        return ResponseEntity.ok(me);
    }

}
