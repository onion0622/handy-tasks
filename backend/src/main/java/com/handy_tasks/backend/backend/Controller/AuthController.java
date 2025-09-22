
package com.handy_tasks.backend.backend.Controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.handy_tasks.backend.backend.Data.LoginRequest;
import com.handy_tasks.backend.backend.Data.RegisterRequest;
import com.handy_tasks.backend.backend.Model.Usuarios;
import com.handy_tasks.backend.backend.Services.Auth.AuthService;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/auth")
public class AuthController{

    @Autowired
    private AuthService authservice;

    @PostMapping("/register")
    public ResponseEntity<Usuarios> register(@Valid @RequestBody RegisterRequest request){
          
        Usuarios user =  authservice.register(request);

        return ResponseEntity.status(HttpStatus.CREATED).body(user);

    }
    
    @PostMapping("/login")
    public String login(@Valid @RequestBody LoginRequest lrequest){

        return authservice.verify(lrequest);

    }
    
}
/*
import java.time.LocalDateTime;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.handy_tasks.backend.backend.Dto.AuthRequest;
import com.handy_tasks.backend.backend.Dto.AuthResponse;
import com.handy_tasks.backend.backend.Dto.RegisterRequest;
import com.handy_tasks.backend.backend.Model.Rol;
import com.handy_tasks.backend.backend.Model.Usuarios;
import com.handy_tasks.backend.backend.Repo.RepoUsuarios;
import com.handy_tasks.backend.backend.Security.JwtService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@Validated
@RequiredArgsConstructor
public class AuthController {

    private final RepoUsuarios repoUsuarios;
    private final PasswordEncoder encoder;
    private final JwtService jwt;
    
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest req) {
        if (repoUsuarios.existsByEmail(req.getEmail())) {
            return ResponseEntity.badRequest().build();
        }
        Usuarios u = new Usuarios();
        u.setNombre(req.getNombre());
        u.setEmail(req.getEmail());
        u.setContraseña(encoder.encode(req.getContraseña()));
        u.setFecha_creacion(LocalDateTime.now());
        u.setRol(Rol.USER);
        repoUsuarios.save(u);

        String token = jwt.generateToken(u.getEmail(), Map.of("role", u.getRol().name()));
        return ResponseEntity.ok(new AuthResponse(token));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody AuthRequest req) {
        var opt = repoUsuarios.findByEmail(req.getEmail());
        if (opt.isEmpty()) return ResponseEntity.status(401).build();

        var u = opt.get();
        if (!encoder.matches(req.getContraseña(), u.getContraseña())) {
            return ResponseEntity.status(401).build();
        }
        String token = jwt.generateToken(u.getEmail(), Map.of("role", u.getRol().name()));
        return ResponseEntity.ok(new AuthResponse(token));
    }
}
*/