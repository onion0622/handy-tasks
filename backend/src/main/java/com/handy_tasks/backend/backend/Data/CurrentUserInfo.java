package com.handy_tasks.backend.backend.Data;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CurrentUserInfo {

    private String username;
    private String email;
    private LocalDateTime fecha_creacion;
    
}
