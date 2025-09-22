/* package com.handy_tasks.backend.backend.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.handy_tasks.backend.backend.Model.Tareas;
import com.handy_tasks.backend.backend.Services.TareasService;

@RestController
@RequestMapping("/api/tareas")
public class TareasController {
    
    @Autowired
    private TareasService tareasService;
    @GetMapping("/usuario/{iduser}")
    public List<Tareas> obtenerTareasPorUsuario(@PathVariable Integer iduser) {
        return tareasService.findByUser(iduser);
    }

    @GetMapping("/usuario/{iduser}/completadas")
    public List<Tareas> obtenerTareasCompletadas(@PathVariable Integer iduser) {
        return tareasService.findByUsuarioCompletada(iduser);
    }
        @GetMapping("/usuario/{iduser}/pendientes")
    public List<Tareas> obtenerTareasPendientes(@PathVariable Integer iduser) {
        return tareasService.findByUsuarioPendiente(iduser);
    }

    
   
}
*/