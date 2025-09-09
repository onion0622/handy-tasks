package com.handy_tasks.backend.backend.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import com.handy_tasks.backend.backend.Model.Tareas;
import com.handy_tasks.backend.backend.Repo.RepoTareas;

public class TareasServiceImp implements TareasService{

    @Autowired
    private RepoTareas repotareas;

    @Override
    public List<Tareas> findAllTareas() {
        
        return repotareas.findAll();

    }

    @Override
    public Optional<Tareas> findByIdTareas(Integer id) {
        
        return repotareas.findById(id);

    }

    @Override
    public Tareas craerTareas(Tareas tarea) {
        
        return repotareas.save(tarea);

    }

    @Override
    public Tareas actualizarTareas(Tareas tarea) {
        
        return repotareas.save(tarea);

    }

    @Override
    public void eliminarTarea(Integer id) {
        
        repotareas.deleteById(id);

    }
    
}
