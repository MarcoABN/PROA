package com.proa.repository;


import com.proa.model.Procuracao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProcuracaoRepository extends JpaRepository<Procuracao, Long> {

    Optional<Procuracao> findByModeloProcuracao(String modeloProcuracao);
}
