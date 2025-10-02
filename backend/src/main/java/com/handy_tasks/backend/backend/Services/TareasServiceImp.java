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
    private UsuariosServiceImp usuariosService;
    
    @Override
public List<Tareas> findByUser() {
    Usuarios usuario = usuariosService.currentUser(); 
    return usuario.getTareas();
}

@Override
public List<Tareas> findByUsuarioCompletada() {
    Usuarios usuario = usuariosService.currentUser();
    return usuario.getTareas().stream()
                  .filter(Tareas::isCompletada)
                  .toList();
}

@Override
public List<Tareas> findByUsuarioPendiente() {
    Usuarios usuario = usuariosService.currentUser();
    return usuario.getTareas().stream()
                  .filter(t -> !t.isCompletada())
                  .toList();
}
   
    @Override
    public Tareas crearTareas(Tareas tarea) {
        
        Usuarios usuario = usuariosService.currentUser();

        tarea.setUsuario(usuario);
        tarea.setFecha_creacion(LocalDateTime.now());
        
        return repotareas.save(tarea);
        
    }

   
    
} 
