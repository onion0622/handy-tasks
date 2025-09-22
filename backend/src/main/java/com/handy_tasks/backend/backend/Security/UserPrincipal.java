package com.handy_tasks.backend.backend.Security;

import java.util.Collection;
import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.handy_tasks.backend.backend.Model.Usuarios;

public class UserPrincipal implements UserDetails{

    @Autowired
    private Usuarios user;

    public UserPrincipal(Usuarios user){

        this.user=user;

    }

   @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // TODO Auto-generated method stub
        return Collections.singleton(new SimpleGrantedAuthority("ROLE_"+user.getRol().name()));
    }

    @Override
    public String getPassword() {
        // TODO Auto-generated method stub
        return user.getContraseña();
    }

    @Override
    public String getUsername() {
        // TODO Auto-generated method stub
        return user.getEmail();
    }

    @Override
    public boolean isAccountNonExpired() {
        // TODO Auto-generated method stub
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        // TODO Auto-generated method stub
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        // TODO Auto-generated method stub
        return true;
    }

    @Override
    public boolean isEnabled() {
        // TODO Auto-generated method stub
        return true;
    }

    
}
