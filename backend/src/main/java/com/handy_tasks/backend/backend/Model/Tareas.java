package com.handy_tasks.backend.backend.Model;

import java.sql.Date;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Data
@NoArgsConstructor
public class Tareas {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Integer idtarea;
    private String titulo;
    private Date fecha_limite;
    private boolean completada;
    private LocalDateTime fecha_creacion;
    @ManyToOne(fetch = FetchType.LAZY , optional = false)
    @JoinColumn(name = "usuario_id", nullable=false, foreignKey = @ForeignKey(name =  "fk_tareas_usuarios"))
    @JsonBackReference
    @ToString.Exclude
    private Usuarios usuario;

}
