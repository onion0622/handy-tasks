package com.handy_tasks.backend.backend.Services;
import java.util.List;

import com.handy_tasks.backend.backend.Model.Tareas;

public interface TareasService {

    public List<Tareas> findByUser();
    public List<Tareas> findByUsuarioCompletada();
    public List<Tareas> findByUsuarioPendiente();
    public Tareas crearTareas(Tareas tarea);

}   
