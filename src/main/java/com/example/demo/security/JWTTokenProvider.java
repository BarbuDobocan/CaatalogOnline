package com.example.demo.security;

import io.jsonwebtoken.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.util.Date;
import java.util.stream.Collectors;

@Component
@Slf4j
public class JWTTokenProvider implements Serializable {

    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.expirationInMs}")
    private int jwtExpirationInMs;

    public String generateToken(Authentication authentication) {
        final String roles = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));
        System.out.println(3 + "    " + roles);
        return Jwts.builder()
                .setSubject(authentication.getName())
                .claim("Roles",roles)
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .setIssuedAt(new Date())
                .setExpiration(new Date(new Date().getTime() + jwtExpirationInMs * 10000))
                .compact();
    }

    public boolean validateToken(String jwt){
        try {
            System.out.println(4);
            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(jwt);

            return true;
        } catch(SignatureException ex){
            System.out.println("Invalid JWT signature");
        } catch(MalformedJwtException ex){
            System.out.println("Invalid JWT token");
        } catch(ExpiredJwtException ex) {
            System.out.println("Expired JWT token");
        } catch(UnsupportedJwtException ex) {
            System.out.println("Unsupported JWT token");
        } catch(IllegalArgumentException ex) {
            System.out.println("JWT claims string is empty.");
        }
        return false;
    }

    public String getUserNameFromToken(String token){
        System.out.println(5);
        return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().getSubject();
    }
}
