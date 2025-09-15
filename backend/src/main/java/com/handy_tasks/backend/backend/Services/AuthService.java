package com.handy_tasks.backend.backend.Services;

import com.handy_tasks.backend.backend.Model.Usuarios;

public interface AuthService {

    public Usuarios registerUser(Usuarios usuario);
    public String loginUser(String correo, String contraseña);

    
}
