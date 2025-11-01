 package com.handy_tasks.backend.backend.Services;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.handy_tasks.backend.backend.Model.Tareas;
import com.handy_tasks.backend.backend.Model.Usuarios;
import com.handy_tasks.backend.backend.Repo.RepoTareas;


@Service
public class TareasServiceImp implements TareasService{

    @Autowired
    private RepoTareas repotareas;
   
    
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

@Override
public Tareas actualizarTareas(Integer idtarea, Tareas tareaActualizada){
    Usuarios usuario = usuariosService.currentUser();
    Tareas tareaExistente = repotareas.findById(idtarea).orElseThrow(() -> new RuntimeException("Tarea no encontrada"));
    if (!tareaExistente.getUsuario().getIduser().equals(usuario.getIduser())) {
        throw new RuntimeException("No autorizado para modificar esta tarea");
    }
    tareaExistente.setTitulo(tareaActualizada.getTitulo());
    tareaExistente.setCompletada(tareaActualizada.isCompletada());
    tareaExistente.setFecha_limite(tareaActualizada.getFecha_limite());

    return repotareas.save(tareaExistente);
}
   
    
} 
