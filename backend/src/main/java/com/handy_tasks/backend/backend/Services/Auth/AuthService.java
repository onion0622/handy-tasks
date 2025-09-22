package com.handy_tasks.backend.backend.Services.Auth;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.handy_tasks.backend.backend.Data.LoginRequest;
import com.handy_tasks.backend.backend.Data.RegisterRequest;
import com.handy_tasks.backend.backend.Err.DuplicateResourceException;
import com.handy_tasks.backend.backend.Model.Rol;
import com.handy_tasks.backend.backend.Model.Usuarios;
import com.handy_tasks.backend.backend.Repo.RepoUsuarios;
import com.handy_tasks.backend.backend.Services.Jwt.JwtService;


@Service
public class AuthService {

    @Autowired
    private RepoUsuarios repouser;

    @Autowired
    private AuthenticationManager authmanager;

    @Autowired
    private JwtService jwtservice;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    public Usuarios register(RegisterRequest request){

        if(repouser.existsByEmail(request.getEmail())){
            throw new DuplicateResourceException("El email ya esta registrado");
        }

        Usuarios user = new Usuarios();

        user.setNombre(request.getUsername());
        user.setEmail(request.getEmail());
        user.setContraseña(encoder.encode(request.getContraseña()));
        user.setRol(Rol.USER);
        user.setFecha_creacion(LocalDateTime.now());

        return repouser.save(user);

    }

    public String verify(LoginRequest lrequest) {
        
        Authentication auth = authmanager
        .authenticate(new UsernamePasswordAuthenticationToken(lrequest.getEmail(), lrequest.getContraseña()));

        if(auth.isAuthenticated()){

            return jwtservice.generateToken(lrequest.getEmail());
        }else 
        
                return "fail";
    }
    


}
