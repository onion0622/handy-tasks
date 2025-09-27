package com.handy_tasks.backend.backend.Err;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ApiExceptionHandler {

    @ExceptionHandler(DuplicateResourceException.class)
    public ResponseEntity<Map<String,Object>> handleDup(DuplicateResourceException ex){

        return ResponseEntity.status(HttpStatus.CONFLICT)
                             .body(Map.of("error", ex.getMessage()));
    }  

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<Map<String,String>> handleBadCre(BadCredentialsException ex){

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                             .body(Map.of("error", "Usuario o contraseña invalidos..."));
    }
    
    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<Map<String,String>> handleUserNotFound(UsernameNotFoundException ex){

        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                             .body(Map.of("error", "Usuario no encontrado..."));
    }
    
}
