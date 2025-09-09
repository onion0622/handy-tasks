package com.handy_tasks.backend.backend.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.handy_tasks.backend.backend.Model.Usuarios;
import com.handy_tasks.backend.backend.Repo.RepoUsuarios;

@Service
public class UsuariosServiceImp implements UsuariosService{

    @Autowired
    private RepoUsuarios repousuarios;

    @Override
    public List<Usuarios> findAllUsuarios() {
        
        return  repousuarios.findAll();
    }

    @Override
    public Optional<Usuarios> findByIdUsuarios(Integer id) {
        
        return repousuarios.findById(id);
    }

    @Override
    public Usuarios crearUsuario(Usuarios usuario) {

        return repousuarios.save(usuario);
       
    }

    @Override
    public Usuarios actualizarUsuario(Usuarios usuario) {
        
        return repousuarios.save(usuario);
       
    }

    @Override
    public void eliminarUsuario(Integer id) {
      
        repousuarios.deleteById(id);

    }
    
}
