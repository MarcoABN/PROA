package com.proa.repository;


import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.proa.model.Cliente;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long>{
	
	Optional<Cliente> findByCPFCNPJ(String CPFCNPJ);
	
    List<Cliente> findByIdEmpresaAndRepresentaEmpresa(Long idEmpresa, String representaEmpresa);

}