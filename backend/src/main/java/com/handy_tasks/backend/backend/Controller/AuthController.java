
package com.handy_tasks.backend.backend.Controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.handy_tasks.backend.backend.Data.AuthResponse;
import com.handy_tasks.backend.backend.Data.LoginRequest;
import com.handy_tasks.backend.backend.Data.RegisterRequest;
//import com.handy_tasks.backend.backend.Model.Usuarios;
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
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request){
          
        AuthResponse response =  authservice.register(request);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);

    }
    
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest lrequest){

        return ResponseEntity.ok(authservice.verify(lrequest));

    }
    
}
