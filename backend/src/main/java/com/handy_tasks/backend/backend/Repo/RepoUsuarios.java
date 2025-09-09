    package com.handy_tasks.backend.backend.Repo;

    import org.springframework.data.jpa.repository.JpaRepository;
    import org.springframework.stereotype.Repository;

    import com.handy_tasks.backend.backend.Model.Usuarios;

    @Repository
    public interface RepoUsuarios extends JpaRepository<Usuarios, Integer>{
        
    }
