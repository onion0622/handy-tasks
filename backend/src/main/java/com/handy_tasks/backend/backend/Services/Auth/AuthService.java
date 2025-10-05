package com.handy_tasks.backend.backend.Services.Auth;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.handy_tasks.backend.backend.Data.AuthResponse;
import com.handy_tasks.backend.backend.Data.LoginRequest;
import com.handy_tasks.backend.backend.Data.RegisterRequest;
import com.handy_tasks.backend.backend.Err.DuplicateResourceException;
import com.handy_tasks.backend.backend.Model.RefreshToken;
import com.handy_tasks.backend.backend.Model.Rol;
import com.handy_tasks.backend.backend.Model.Usuarios;
import com.handy_tasks.backend.backend.Repo.RepoUsuarios;
import com.handy_tasks.backend.backend.Services.Jwt.JwtService;
import com.handy_tasks.backend.backend.Services.Token.RefreshTokenService;


@Service
public class AuthService {

    @Autowired
    private RepoUsuarios repouser;

    @Autowired
    private AuthenticationManager authmanager;

    @Autowired
    private JwtService jwtservice;

    @Autowired
    private RefreshTokenService refreshtokenser;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    public AuthResponse register(RegisterRequest request){

        if(repouser.existsByEmail(request.getEmail())){
            throw new DuplicateResourceException("El email ya esta registrado");
        }

        Usuarios user = new Usuarios();

        user.setNombre(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(encoder.encode(request.getPassword()));
        user.setRol(Rol.USER);
        user.setFecha_creacion(LocalDateTime.now());

        String token = jwtservice.generateToken(request.getEmail());

        RefreshToken rtcreado = refreshtokenser.crearRT(user); 

        repouser.save(user);

        return new AuthResponse(token, rtcreado.getToken());

    }

    public AuthResponse verify(LoginRequest lrequest) {
        
        Authentication auth = authmanager
        .authenticate(new UsernamePasswordAuthenticationToken(lrequest.getEmail(), lrequest.getPassword()));

       

        if(auth.isAuthenticated()){

            Usuarios usuario = repouser.findByEmail(lrequest.getEmail()).orElseThrow();
            RefreshToken rtcreado = refreshtokenser.crearRT(usuario); 
            return new AuthResponse(jwtservice.generateToken(lrequest.getEmail()), rtcreado.getToken());
        }else 
        
                throw new BadCredentialsException("Invalido...");
    }
    


}
