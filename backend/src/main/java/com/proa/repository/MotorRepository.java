package com.proa.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.proa.model.Motor;

@Repository
public interface MotorRepository extends JpaRepository<Motor, Long>{
	
	List<Motor> findByEmbarcacaoId(Long Id);

}
