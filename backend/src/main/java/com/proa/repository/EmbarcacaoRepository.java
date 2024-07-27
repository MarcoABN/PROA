package com.proa.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.proa.model.Embarcacao;

@Repository
public interface EmbarcacaoRepository extends JpaRepository<Embarcacao, Long> {
	
	List<Embarcacao> findByClienteId(Long id);
	

}
