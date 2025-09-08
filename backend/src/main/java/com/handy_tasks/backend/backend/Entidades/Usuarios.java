package com.handy_tasks.backend.backend.Entidades;
import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Usuarios {

    @Id
    @GeneratedValue (strategy=GenerationType.IDENTITY)
    private Integer id;
    private String nombre, email, contraseña;
    private LocalDateTime fecha_creacion;
    @OneToMany
    private List<Tareas> tarea;

    public Usuarios(){

    }
 

    @Override
    public String toString() {
        return "Usuarios [id=" + id + ", nombre=" + nombre + ", email=" + email + ", contraseña=" + contraseña
                + ", fecha_creacion=" + fecha_creacion + ", tarea=" + tarea + "]";
    }


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getContraseña() {
        return contraseña;
    }

    public void setContraseña(String contraseña) {
        this.contraseña = contraseña;
    }

    public LocalDateTime getFecha_creacion() {
        return fecha_creacion;
    }

    public void setFecha_creacion(LocalDateTime fecha_creacion) {
        this.fecha_creacion = fecha_creacion;
    }

    public List<Tareas> getTarea() {
        return tarea;
    }

    public void setTarea(List<Tareas> tarea) {
        this.tarea = tarea;
    }

    
    
    
}
