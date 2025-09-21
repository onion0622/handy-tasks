package com.handy_tasks.backend.backend.Model;
import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class Usuarios {

    @Id
    @GeneratedValue (strategy=GenerationType.IDENTITY)
    private Integer iduser;
    @Enumerated(EnumType.STRING)
    private Rol rol;
    private String nombre;
    @Column(unique = true, nullable = false)
    private String email;
    @JsonProperty(access = Access.WRITE_ONLY)
    private String contraseña;
    private LocalDateTime fecha_creacion;
    @OneToMany(mappedBy = "usuario")
    private List<Tareas> tarea;
    
}
