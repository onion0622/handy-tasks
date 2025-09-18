package com.handy_tasks.backend.backend.Services;
import java.util.List;

import com.handy_tasks.backend.backend.Model.Tareas;

public interface TareasService {

    public List<Tareas> obtenerTareasPorUser(Integer iduser);
    public Tareas crearTareas(Integer iduser, Tareas tarea);
    public Tareas actualizarTareas(Integer id, Integer idtarea, Tareas tarea);
    public void eliminarTarea(Integer iduser, Integer idtarea); 
    List<Tareas> obtenerTareasCompletadas();
    List<Tareas> obtenerTareasPendientes();
    List<Tareas> obtenerTodas();
}   
