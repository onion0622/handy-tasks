package com.handy_tasks.backend.backend.Services;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.handy_tasks.backend.backend.Data.CurrentUserInfo;
import com.handy_tasks.backend.backend.Model.Rol;
import com.handy_tasks.backend.backend.Model.Usuarios;
import com.handy_tasks.backend.backend.Repo.RepoUsuarios;

@Service
public class UsuariosServiceImp implements UsuariosService{

    @Autowired
    private RepoUsuarios repousuarios;

    private String currentUserEmail(){

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        return auth.getName();

    }

    public Usuarios currentUser(){

        String email = currentUserEmail();

        Usuarios user = repousuarios.findByEmail(email)
                                    .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado..."));

        return user;
    }

    @Override
    public CurrentUserInfo findMyInfo(){

        Usuarios user = currentUser();    

        return new CurrentUserInfo(user.getNombre(), user.getEmail(), user.getFecha_creacion());
    }

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

        usuario.setFecha_creacion(LocalDateTime.now());
        usuario.setRol(Rol.USER);
        return repousuarios.save(usuario);
       
    }

    @Override
    public Optional<Usuarios> actualizarUsuario(Integer id, Usuarios usuario) {

       return repousuarios.findById(id).map(usuarioActualizado -> {
        usuarioActualizado.setNombre(usuario.getNombre());
        usuarioActualizado.setEmail(usuario.getEmail());
        usuarioActualizado.setPassword(usuario.getPassword());
        return repousuarios.save(usuarioActualizado); 
    });
        /*Usuarios usuarioactualizado = repousuarios.findById(id)
        .orElseThrow(() -> new RuntimeException("Usuario no encontrado..."));

        usuarioactualizado.setNombre(usuario.getNombre());
        usuarioactualizado.setContraseña(usuario.getContraseña());
        usuarioactualizado.setEmail(usuario.getContraseña());
        
        
        return repousuarios.save(usuarioactualizado);
       */
    }

    @Override
    public void eliminarUsuario(Integer id) {
      
        repousuarios.deleteById(id);

    }
    
}
