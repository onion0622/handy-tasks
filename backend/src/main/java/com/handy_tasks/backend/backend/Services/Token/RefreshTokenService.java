package com.handy_tasks.backend.backend.Services.Token;

import java.time.Instant;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.handy_tasks.backend.backend.Model.RefreshToken;
import com.handy_tasks.backend.backend.Model.Usuarios;
import com.handy_tasks.backend.backend.Repo.RepoRefreshToken;

@Service
public class RefreshTokenService {

    @Autowired
    RepoRefreshToken reporefreshtoken;

    public RefreshToken crearRT(Usuarios usuario){

        RefreshToken refreshtoken = RefreshToken.builder()
                                                .usuario(usuario)
                                                .token(UUID.randomUUID().toString()+"."+UUID.randomUUID())
                                                .creadoen(Instant.now())
                                                .expiraen(null)
                                                .revocadoen(null)
                                                .reemplazadopor(null)
                                                .build();

        return reporefreshtoken.save(refreshtoken);
    }

    public RefreshToken rotarRefreshToken(RefreshToken refreshtoken_viejo, Usuarios usuario){

        refreshtoken_viejo.setRevocadoen(Instant.now());

        RefreshToken refreshtoken_nuevo = crearRT(usuario);

        refreshtoken_viejo.setReemplazadopor(refreshtoken_nuevo.getToken());

        reporefreshtoken.save(refreshtoken_viejo);

        return refreshtoken_nuevo;

    }

    public void borrarTokens(Usuarios usuarios){

        reporefreshtoken.deleteByUsuario(usuarios);
    }
    
}
