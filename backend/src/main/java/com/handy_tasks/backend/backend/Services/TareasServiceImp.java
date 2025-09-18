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
    public List<Tareas> obtenerTareasPorUser(Integer iduser) {

        Usuarios usuario = repousuarios.findById(iduser)
        .orElseThrow(() -> new RuntimeException("Usuario no encontrado..."));

        return usuario.getTarea();

    }
    @Override
    public List<Tareas> obtenerTodas() {
        return repoTareas.findAll();  
    }
    @Override
    public List<Tareas> obtenerTareasCompletadas() {
        return repoTareas.findByCompletada(true);
    }
    @Override
    public List<Tareas> obtenerTareasPendientes() {
        return repoTareas.findByCompletada(false);
    }
    @Override
    public Tareas crearTareas(Integer iduser, Tareas tarea) {
        
        Usuarios usuario = repousuarios.findById(iduser)
        .orElseThrow(() -> new RuntimeException("Usuario no encontrado..."));

        tarea.setUsuario(usuario);
        tarea.setFecha_creacion(LocalDateTime.now());
        
        return repotareas.save(tarea);
        
    }
    @Override
    public Tareas actualizarTareas(Integer iduser, Integer idtarea, Tareas tarea) {

        Tareas tarea1 = repotareas.findById(idtarea)
        .orElseThrow(() -> new RuntimeException("Tarea no encontrada..."));

        if(!tarea1.getUsuario().getIduser().equals(iduser)){

            throw new RuntimeException("La tarea no pertence a este user...");
        }


        tarea1.setTitulo(tarea.getTitulo());
        tarea1.setCompletada(tarea.isCompletada());

        return repotareas.save(tarea1);

    }
    @Override
    public void eliminarTarea(Integer iduser, Integer idtarea) {
        
        Tareas tarea = repotareas.findById(idtarea)
        .orElseThrow(() -> new RuntimeException("Tarea no encontrada..."));

        if(!tarea.getUsuario().getIduser().equals(iduser)){

            throw new RuntimeException("No esta autorizado para borrar esta tarea");
        }
        else{
        repotareas.delete(tarea);
        }
    }    
}
