package com.handy_tasks.backend.backend.Repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.handy_tasks.backend.backend.Model.RefreshToken;
import com.handy_tasks.backend.backend.Model.Usuarios;

@Repository
public interface RepoRefreshToken extends JpaRepository<RefreshToken, Long>{

    Optional<RefreshToken> findByToken(String token);

    void deleteByUsuario(Usuarios usuario);
    
}
