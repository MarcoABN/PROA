package com.proa.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.proa.model.Prestador;

@Repository
public interface PrestadorRepository extends JpaRepository<Prestador, Long>  {

	
	// Retorna todos que são instrutores (instrutor = true)
    List<Prestador> findByInstrutorTrue();

    // Retorna todos que são procuradores (procurador = true)
    List<Prestador> findByProcuradorTrue();
}
