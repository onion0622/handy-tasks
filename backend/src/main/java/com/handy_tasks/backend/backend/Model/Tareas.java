package com.handy_tasks.backend.backend.Model;

import java.sql.Date;
import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class Tareas {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Integer idtarea;
    private String titulo, descripcion;
    private Date fecha_limite;
    private boolean completada;
    private LocalDateTime fecha_creacion;
    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable=false)
    private Usuarios usuario;

}
