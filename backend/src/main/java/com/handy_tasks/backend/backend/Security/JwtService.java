package com.handy_tasks.backend.backend.Security;

import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.Map;
import java.util.function.Function;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {
    
    @Value("${app.jwt.secret}")
    private String secret;

    @Value("${app.jwt.expiration-min}")
    private long expirationMinutes;

    private byte[] key(){

        return secret.getBytes(StandardCharsets.UTF_8);

    }

    public String generateToken(String subject, Map<String,Object> extraClaims) {
        Date now = new Date();
        Date exp = new Date(now.getTime() + expirationMinutes * 60_000);
        return Jwts.builder()
                .setClaims(extraClaims)
                .setSubject(subject)
                .setIssuedAt(now)
                .setExpiration(exp)
                .signWith(Keys.hmacShaKeyFor(key()), SignatureAlgorithm.HS256)
                .compact();
    }

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public <T> T extractClaim(String token, Function<Claims, T> resolver) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(Keys.hmacShaKeyFor(key()))
                .build()
                .parseClaimsJws(token)
                .getBody();
        return resolver.apply(claims);
    }
    
}
