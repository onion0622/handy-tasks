 package com.handy_tasks.backend.backend.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.handy_tasks.backend.backend.Model.Tareas;
import com.handy_tasks.backend.backend.Services.TareasService;

 
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
    public ResponseEntity<Tareas> crearTareas(@RequestBody Tareas tarea) {
        
        return ResponseEntity.status(HttpStatus.CREATED).body(tareasService.crearTareas(tarea));
    }
    @PutMapping("/{idtarea}/actualizar")
    public ResponseEntity<Tareas> actualizarTarea(
        @PathVariable Integer idtarea,
        @RequestBody Tareas tarea) {
    
    Tareas tareaActualizada = tareasService.actualizarTareas(idtarea, tarea);
    return ResponseEntity.ok(tareaActualizada);
}
    
}
