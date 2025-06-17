package com.proa.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.proa.model.EscolaNautica;

@Repository
public interface EscolaNauticaRepository extends JpaRepository<EscolaNautica, Long>  {
	
	

}
