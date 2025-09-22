package com.handy_tasks.backend.backend.Services;
import java.util.List;
import java.util.Optional;

import com.handy_tasks.backend.backend.Model.Tareas;

public interface TareasService {

    public Optional<List<Tareas>> obtenerTareasPorUser(Integer iduser);
    //public Optional<Tareas> obtenerTareaPorIdUser(Long usuario_id);
    public Tareas crearTareas(Integer iduser, Tareas tarea);
    //public Optional<Tareas> actualizarTareas(Integer id, Integer idtarea, Tareas tarea);
    //public void eliminarTarea(Integer iduser, Integer idtarea); 
    List<Tareas> obtenerTareasCompletadas();
    List<Tareas> obtenerTareasPendientes();
    List<Tareas> obtenerTodas();
}   
