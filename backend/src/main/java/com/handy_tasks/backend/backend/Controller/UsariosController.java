package com.handy_tasks.backend.backend.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.handy_tasks.backend.backend.Model.Usuarios;
import com.handy_tasks.backend.backend.Services.UsuariosService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;


 
@RestController
@RequestMapping("/api/usuarios")
public class UsariosController {
    
    @Autowired
    private UsuariosService usuarioservice;

    @GetMapping
    public ResponseEntity<List<Usuarios>> getUsuarios(){

        return ResponseEntity.ok(usuarioservice.findAllUsuarios());

    }

    @GetMapping("/{id}")
    public ResponseEntity<Usuarios> getUsuarioById(@PathVariable Integer id){

        Optional<Usuarios> buscausuario = usuarioservice.findByIdUsuarios(id);
 
        return buscausuario.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());

    }

    @PostMapping
    public ResponseEntity<Usuarios> crearUsuarios(@RequestBody Usuarios usuario){
    

        return ResponseEntity.ok(usuarioservice.crearUsuario(usuario));

    }

    @PutMapping("/{id}")
    public ResponseEntity<Usuarios> actualizarUsuario(@PathVariable Integer id, @RequestBody Usuarios usuario){

        return ResponseEntity.ok(usuarioservice.actualizarUsuario(id, usuario));

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarUsuario(Integer id){

        usuarioservice.eliminarUsuario(id);

        return ResponseEntity.noContent().build();

    }

    


}
