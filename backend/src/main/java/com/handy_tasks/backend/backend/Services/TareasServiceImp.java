 package com.handy_tasks.backend.backend.Services;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.handy_tasks.backend.backend.Model.Tareas;
import com.handy_tasks.backend.backend.Model.Usuarios;
import com.handy_tasks.backend.backend.Repo.RepoTareas;
import com.handy_tasks.backend.backend.Repo.RepoUsuarios;

@Service
public class TareasServiceImp implements TareasService{

    @Autowired
    private RepoTareas repotareas;
    @Autowired
    private RepoUsuarios repousuarios;
    @Autowired
    private RepoTareas repoTareas;

    
    @Override
    public List<Tareas> findByUser(Integer iduser) {
        return repoTareas.findByUsuario_Iduser(iduser);
    }

    @Override
    public List<Tareas> findByUsuarioCompletada(Integer iduser) {
        return repoTareas.findByUsuario_IduserAndCompletadaTrue(iduser);
    }

    @Override
    public List<Tareas> findByUsuarioPendiente(Integer iduser) {
        return repoTareas.findByUsuario_IduserAndCompletadaFalse(iduser);
    }


   
    @Override
    public Tareas crearTareas(Integer iduser, Tareas tarea) {
        
        Usuarios usuario = repousuarios.findById(iduser)
        .orElseThrow(() -> new RuntimeException("Usuario no encontrado..."));

        tarea.setUsuario(usuario);
        tarea.setFecha_creacion(LocalDateTime.now());
        
        return repotareas.save(tarea);
        
    }
    
  


   
    
} 
