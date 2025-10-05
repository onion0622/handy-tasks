package com.handy_tasks.backend.backend.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.handy_tasks.backend.backend.Data.AuthResponse;
import com.handy_tasks.backend.backend.Data.RefreshRequest;
import com.handy_tasks.backend.backend.Model.RefreshToken;
import com.handy_tasks.backend.backend.Model.Usuarios;
import com.handy_tasks.backend.backend.Repo.RepoRefreshToken;
import com.handy_tasks.backend.backend.Services.Jwt.JwtService;
import com.handy_tasks.backend.backend.Services.Token.RefreshTokenService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/auth")
public class RefreshController {

    @Autowired
    private RepoRefreshToken report;
    @Autowired
    private RefreshTokenService rtser;
    @Autowired
    private JwtService jwtser;


    @PostMapping("/refresh")
    public ResponseEntity<AuthResponse> refresh(@RequestBody RefreshRequest rtrq ) {

        RefreshToken rt = report.findByToken(rtrq.getRefreshtoken())
                                .orElseThrow(() -> new RuntimeException("Refresh Token inválido..."));
        
        if (rt.getRevocadoen() != null) throw new RuntimeException("Refresh token revocado...");
        if(rt.getExpiraen() != null && rt.getExpiraen().isBefore(java.time.Instant.now())) 
        throw new RuntimeException("Refresh token expirado");

        Usuarios usuario = rt.getUsuario();

        RefreshToken nuevort = rtser.rotarRefreshToken(rt, usuario);
        String nuevojwt = jwtser.generateToken(usuario.getEmail());
        
        return ResponseEntity.ok(new AuthResponse(nuevojwt, nuevort.getToken()));
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(@RequestBody(required=false) RefreshRequest rtrq) {

        if(rtrq != null && rtrq.getRefreshtoken() != null){

            report.findByToken(rtrq.getRefreshtoken()).ifPresent(rt -> rtser.borrarTokens(rt.getUsuario()));
        
        }

        return ResponseEntity.noContent().build();
     
    }


}
