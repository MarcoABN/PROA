package com.proa.service;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.proa.model.Cliente;
import com.proa.model.Embarcacao;
import com.proa.repository.ClienteRepository;
import com.proa.repository.EmbarcacaoRepository;

@Service
public class VencimentoService {
    
    @Autowired
    private ClienteRepository clienteRepository;
    @Autowired
    private EmbarcacaoRepository embarcacaoRepository;
    
    
    public List<Cliente> buscarClientesComChaVencendoEntre(LocalDate dataInicio, LocalDate dataFim) {
        return clienteRepository.findClientesComChaVencendoEntre(dataInicio, dataFim);
    }
    
    
    public List<Embarcacao> buscarEmbarcacaoComTieVencendoEntre(LocalDate dataInicio, LocalDate dataFim) {
        return embarcacaoRepository.findEmbarcacaoComTieVencendoEntre(dataInicio, dataFim);
    }
    
    
    public List<Embarcacao> buscarEmbarcacaoComSeguroVencendoEntre(LocalDate dataInicio, LocalDate dataFim) {
        return embarcacaoRepository.findEmbarcacaoComSeguroVencendoEntre(dataInicio, dataFim);
    }
}