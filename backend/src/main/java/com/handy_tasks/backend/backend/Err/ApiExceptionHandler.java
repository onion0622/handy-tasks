package com.handy_tasks.backend.backend.Err;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ApiExceptionHandler {

    @ExceptionHandler(DuplicateResourceException.class)
    public ResponseEntity<Map<String,Object>> handleDup(DuplicateResourceException ex){

        return ResponseEntity.status(HttpStatus.CONFLICT)
                             .body(Map.of("error", ex.getMessage()));
    }  
    
}
