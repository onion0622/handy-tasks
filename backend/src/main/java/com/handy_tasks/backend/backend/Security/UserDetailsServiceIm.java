package com.handy_tasks.backend.backend.Security;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.handy_tasks.backend.backend.Model.Usuarios;
import com.handy_tasks.backend.backend.Repo.RepoUsuarios;

@Service
public class UserDetailsServiceIm implements UserDetailsService{

    @Autowired
    private RepoUsuarios repouser;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

       Usuarios user = repouser.findByEmail(email)
                               .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado..."));

        UserPrincipal user1 = new UserPrincipal(user);

        return user1;      
    }
    
}
