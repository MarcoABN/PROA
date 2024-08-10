package com.proa.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.proa.model.Motor;
import com.proa.model.NotaFiscal;

@Repository
public interface NotaFiscalRepository extends JpaRepository<NotaFiscal, Long>  {

	
	List<NotaFiscal> findByEmbarcacaoId(Long Id);
	
}
