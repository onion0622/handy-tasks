package com.handy_tasks.backend.backend.Err;

public class DuplicateResourceException extends RuntimeException{

    public DuplicateResourceException(String message){
        super(message);
    }
    
}
