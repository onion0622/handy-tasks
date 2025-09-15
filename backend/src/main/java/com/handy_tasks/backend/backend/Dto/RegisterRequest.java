package com.handy_tasks.backend.backend.Dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {
    
    @NotBlank
    private String nombre;
    @Email
    @NotBlank
    private String email;
    @NotBlank
    private String contraseña;
}
