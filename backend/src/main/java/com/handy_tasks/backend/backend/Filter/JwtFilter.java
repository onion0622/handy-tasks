package com.handy_tasks.backend.backend.Filter;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.handy_tasks.backend.backend.Services.Jwt.JwtService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;


@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private JwtService jwtservice;
    @Autowired
    private ApplicationContext context;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        
        String authheader = request.getHeader("Authorization");
        String token=null;
        String username=null;

        if(authheader != null && authheader.startsWith("Bearer ")){

            token = authheader.substring(7);
            username = jwtservice.extractUserName(token);
        }

        if(username != null && SecurityContextHolder.getContext().getAuthentication() == null){
            
            UserDetails userdetails = context.getBean(UserDetailsService.class).loadUserByUsername(username);

            if(jwtservice.validateToken(token, userdetails)){
                UsernamePasswordAuthenticationToken authtoken
                = new UsernamePasswordAuthenticationToken(userdetails, null, userdetails.getAuthorities());

                authtoken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authtoken);

            }
        }

        filterChain.doFilter(request, response);
    }
    
}
