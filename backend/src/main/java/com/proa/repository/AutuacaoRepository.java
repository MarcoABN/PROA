package com.proa.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.proa.model.Autuacao;

@Repository
public interface AutuacaoRepository extends JpaRepository<Autuacao, Long>{
	

}
