package com.handy_tasks.backend.backend.Services;
import java.util.List;

import com.handy_tasks.backend.backend.Model.Tareas;

public interface TareasService {

    public Tareas crearTareas(Integer iduser, Tareas tarea);
    
    public List<Tareas> findByUser();
    public List<Tareas> findByUsuarioCompletada();
    public List<Tareas> findByUsuarioPendiente();

}   
