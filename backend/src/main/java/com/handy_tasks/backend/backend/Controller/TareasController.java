 package com.handy_tasks.backend.backend.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.handy_tasks.backend.backend.Model.Tareas;
import com.handy_tasks.backend.backend.Services.TareasService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

 
@RestController
@RequestMapping("/api/tareas")
public class TareasController {

    @Autowired
    private TareasService tareasService;



    @GetMapping
    public List<Tareas> obtenerTodasPorUsuarioLogueado() {
        return tareasService.findByUser();
    }

    @GetMapping("/completadas")
    public List<Tareas> obtenerCompletadasPorUsuarioLogueado() {
        return tareasService.findByUsuarioCompletada();
    }

    @GetMapping("/pendientes")
    public List<Tareas> obtenerPendientesPorUsuarioLogueado() {
        return tareasService.findByUsuarioPendiente();
    }
    @PostMapping
    public Tareas postMethodName(@RequestBody Tareas tarea) {
        
        return tareasService.crearTareas(tarea);
    }
    
}
