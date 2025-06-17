package com.proa.repository;


import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.proa.model.Cliente;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long>{
	
	Optional<Cliente> findByCPFCNPJ(String CPFCNPJ);
	
	Cliente findByEmail(String email);
	
	 // Novo método para busca parcial por nome (case insensitive)
    @Query("SELECT c FROM Cliente c WHERE LOWER(c.nome) LIKE LOWER(CONCAT('%', :nome, '%'))")
    List<Cliente> findByNomeContainingIgnoreCase(@Param("nome") String nome);
	
    //List<Cliente> findByIdEmpresaAndRepresentaEmpresa(Long idEmpresa, String representaEmpresa);

}