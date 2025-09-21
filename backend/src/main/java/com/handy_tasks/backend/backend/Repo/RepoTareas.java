package com.handy_tasks.backend.backend.Repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.handy_tasks.backend.backend.Model.Tareas;

@Repository
public interface RepoTareas extends JpaRepository<Tareas, Integer>{
    List<Tareas> findByUsuario_Iduser(Integer iduser);
    List<Tareas> findByUsuario_IduserAndCompletadaTrue(Integer iduser);
    List<Tareas> findByUsuario_IduserAndCompletadaFalse(Integer iduser);
}
