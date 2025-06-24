package com.proa.repository;


import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.google.cloud.Date;
import com.proa.model.Cliente;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long>{
	
	Optional<Cliente> findByCPFCNPJ(String CPFCNPJ);
	
	Cliente findByEmail(String email);
	
	 // Novo método para busca parcial por nome (case insensitive)
    @Query("SELECT c FROM Cliente c WHERE LOWER(c.nome) LIKE LOWER(CONCAT('%', :nome, '%'))")
    List<Cliente> findByNomeContainingIgnoreCase(@Param("nome") String nome);
	
    //List<Cliente> findByIdEmpresaAndRepresentaEmpresa(Long idEmpresa, String representaEmpresa);

    @Query(value = "SELECT * FROM cliente c WHERE " +
            "c.cha_dtemissao IS NOT NULL AND " +
            "c.cha_dtemissao + INTERVAL '5 years' BETWEEN ?1 AND ?2", 
            nativeQuery = true)
     List<Cliente> findClientesComChaVencendoEntre(
         @Param("dataInicio") LocalDate dataInicio, 
         @Param("dataFim") LocalDate dataFim
     );
}