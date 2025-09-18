package com.handy_tasks.backend.backend.Controller;

import com.handy_tasks.backend.backend.Model.Tareas;
import com.handy_tasks.backend.backend.Services.TareasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tareas")
public class TareasController {
    @Autowired
    private TareasService tareasService;
    @GetMapping
    public List<Tareas> obtenerTodas() {
        return tareasService.obtenerTodas();
    }

    @GetMapping("/completadas")
    public List<Tareas> obtenerCompletadas() {
        return tareasService.obtenerTareasCompletadas();
    }
    
    @GetMapping("/pendientes")
    public List<Tareas> obtenerPendientes() {
        return tareasService.obtenerTareasPendientes();
    }
}
