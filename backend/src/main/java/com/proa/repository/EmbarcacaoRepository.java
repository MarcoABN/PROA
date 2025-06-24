package com.proa.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.proa.model.Cliente;
import com.proa.model.Embarcacao;

@Repository
public interface EmbarcacaoRepository extends JpaRepository<Embarcacao, Long> {
	
	List<Embarcacao> findByClienteId(Long id);
	
	@Query(value = "SELECT * FROM embarcacao c WHERE " +
            "c.dtinscricao IS NOT NULL AND " +
            "c.dtinscricao + INTERVAL '5 years' BETWEEN ?1 AND ?2", 
            nativeQuery = true)
     List<Embarcacao> findEmbarcacaoComTieVencendoEntre(
         @Param("dataInicio") LocalDate dataInicio, 
         @Param("dataFim") LocalDate dataFim
     );
	
	
	@Query(value = "SELECT * FROM embarcacao c WHERE " +
            "c.dtseguro IS NOT NULL AND " +
            "c.dtseguro + INTERVAL '1 years' BETWEEN ?1 AND ?2", 
            nativeQuery = true)
     List<Embarcacao> findEmbarcacaoComSeguroVencendoEntre(
         @Param("dataInicio") LocalDate dataInicio, 
         @Param("dataFim") LocalDate dataFim
     );

}
