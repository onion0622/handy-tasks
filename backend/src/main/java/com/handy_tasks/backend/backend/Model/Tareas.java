package com.handy_tasks.backend.backend.Model;

import java.sql.Date;
import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Tareas {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Integer id;
    private String titulo, descripcion;
    private Date fecha_limite;
    private boolean completada;
    private LocalDateTime fecha_creacion;
    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable=false)
    private Usuarios usuario;

    public Tareas(){

    }

    @Override
    public String toString() {
        return "Tareas [id=" + id + ", titulo=" + titulo + ", descripcion=" + descripcion + ", fecha_limite="
                + fecha_limite + ", completada=" + completada + ", fecha_creacion=" + fecha_creacion + ", usuario="
                + usuario + "]";
    }



    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    public String getTitulo() {
        return titulo;
    }
    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }
    public String getDescripcion() {
        return descripcion;
    }
    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }
    public Date getFecha_limite() {
        return fecha_limite;
    }
    public void setFecha_limite(Date fecha_limite) {
        this.fecha_limite = fecha_limite;
    }

    public Usuarios getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuarios usuario) {
        this.usuario = usuario;
    }



    public boolean isCompletada() {
        return completada;
    }



    public void setCompletada(boolean completada) {
        this.completada = completada;
    }



    public LocalDateTime getFecha_creacion() {
        return fecha_creacion;
    }



    public void setFecha_creacion(LocalDateTime fecha_creacion) {
        this.fecha_creacion = fecha_creacion;
    }
      

    
}
