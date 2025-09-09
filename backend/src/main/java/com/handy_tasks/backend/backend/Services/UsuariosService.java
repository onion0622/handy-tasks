package com.handy_tasks.backend.backend.Services;

import java.util.List;
import java.util.Optional;

import com.handy_tasks.backend.backend.Model.Usuarios;

public interface UsuariosService {

    public List<Usuarios> findAllUsuarios();
    public Optional<Usuarios> findByIdUsuarios(Integer id);
    public Usuarios crearUsuario(Usuarios usuario);
    public Usuarios actualizarUsuario(Integer id, Usuarios usuario);
    public void eliminarUsuario(Integer id);
    
}
