package com.handy_tasks.backend.backend.Services;

import java.util.List;
import java.util.Optional;

import com.handy_tasks.backend.backend.Model.Tareas;

public interface TareasService {

    public List<Tareas> findAllTareas();
    public Optional<Tareas> findByIdTareas(Integer id);
    public Tareas craerTareas(Tareas tarea);
    public Tareas actualizarTareas(Tareas tarea);
    public void eliminarTarea(Integer id);

}
